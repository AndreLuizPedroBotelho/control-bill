import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Payment from 'App/Models/Payment'
import PaymentValidator from 'App/Validators/PaymentValidator'
import { DateTime } from 'luxon'

export default class PaymentsController {
  public async index({ response, request, auth }: HttpContextContract) {
    const { page, filters } = request.qs()
    const userId = auth.user!.id

    const data = await Payment.query()
      .whereHas('bill', (query) => {
        query.where('userId', userId)
      })
      .if(filters?.name, (query) => {
        query.andWhereLike('name', `%${filters.name}%`)
      })
      .if(String(filters?.paid || ''), (query) => {
        console.log(filters.paid)
        query.andWhere('paid', false)
      })
      .if(filters?.month, (query) => {
        query.andWhere('month', filters.month)
      })
      .if(filters?.year, (query) => {
        query.andWhere('year', filters.year)
      })
      .if(filters?.billId, (query) => {
        query.andWhere('billId', filters.billId)
      })
      .if(filters?.typePaymentId, (query) => {
        query.andWhere('typePaymentId', filters.typePaymentId)
      })
      .preload('typePayment')
      .preload('bill')
      .orderBy('year', 'desc')
      .orderBy('month', 'desc')
      .orderBy(Database.raw('CASE WHEN paid THEN 1 ELSE 0 END '), 'asc')

      .paginate(page || 1, 10)

    response.status(200).json(data)
  }
  public async show({ response, request }: HttpContextContract) {
    const { id } = request.params()
    const payment = await Payment.find(id)

    if (!payment) {
      throw new Error('Payment not found')
    }

    response.status(200).json({ payment })
  }

  public async store({ response, request }: HttpContextContract) {
    const payload = await request.validate(PaymentValidator)
    payload.month = payload.month || DateTime.local().month
    payload.year = payload.year || DateTime.local().year

    const payment = await Payment.create(payload)

    response.status(201).json({ payment })
  }

  public async update({ response, request }: HttpContextContract) {
    const payload = await request.validate(PaymentValidator)
    const { id } = request.params()
    const payment = await Payment.find(id)

    if (!payment) {
      throw new Error('Payment not found')
    }

    payload.month = payload.month || payment.month || DateTime.local().month
    payload.year = payload.year || payment.year || DateTime.local().year

    await payment.merge(payload).save()

    response.status(200).json({ payment })
  }

  public async destroy({ response, request }: HttpContextContract) {
    const { id } = request.params()
    const payment = await Payment.find(id)

    if (!payment) {
      throw new Error('Payment not found')
    }

    await payment.delete()

    response.status(204)
  }
}
