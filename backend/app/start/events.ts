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
  const month = DateTime.now().toFormat('M')

  const bills = await Bill.query()
    .where('recurrent', true)
    .whereDoesntHave('payments', (query) => {
      query.where('month', month).andWhere('year', year)
    })

  if (bills.length <= 0) {
    return
  }

  const payments: Partial<Payment>[] = []

  for (const bill of bills) {
    payments.push({
      name: `${bill.name} - ${String(month).padStart(2, '0')}/${year}`,
      amount: bill.amount,
      paid: false,
      month: parseInt(month),
      year: parseInt(year),
      billId: bill.id,
      typePaymentId: bill.typePaymentId,
    })
  }

  await Payment.createMany(payments)

  Logger.info(`${payments.length} payments was created`)
})
