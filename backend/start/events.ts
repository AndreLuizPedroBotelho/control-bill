/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Event from '@ioc:Adonis/Core/Event'
import Bill from 'App/Models/Bill'
import { DateTime } from 'luxon'
import Payment from '../app/Models/Payment'
import Logger from '@ioc:Adonis/Core/Logger'

Event.on('new:payment', async () => {
  const year = DateTime.now().toFormat('yyyy')
  const month = Number(DateTime.now().toFormat('M')) + 1

  const bills = await Bill.query()
    .where('recurrent', true)
    .andWhere((query) => {
      query.whereDoesntHave('payments', (query) => {
        query.where('month', month).andWhere('year', year)
      })
    })
    .orHas('payments', "=", 0)

  if (bills.length <= 0) {
    return
  }

  const payments: Partial<Payment>[] = []

  for (const bill of bills) {
    payments.push({
      name: `${bill.name} - ${String(month).padStart(2, '0')}/${year}`,
      amount: bill.amount,
      paid: false,
      month: month,
      year: parseInt(year),
      billId: bill.id,
      typePaymentId: bill.typePaymentId,
    })
  }

  await Payment.createMany(payments)

  Logger.info(`${payments.length} payments was created`)
})
