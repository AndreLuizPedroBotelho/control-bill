import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TypePayment from 'App/Models/TypePayment'
import TypePaymentValidator from 'App/Validators/TypePaymentValidator'

export default class TypePaymentsController {
  public async index({ response, request }: HttpContextContract) {
    const { search, page } = request.qs()
    const data = await TypePayment.query()
      .if(search, (query) => {
        query.whereLike('name', `%${search}%`)
      })
      .paginate(page || 1)

    response.status(200).json(data)
  }
  public async show({ response, request }: HttpContextContract) {
    const { id } = request.params()

    const typePayment = await TypePayment.find(id)

    response.status(200).json({ typePayment })
  }

  public async store({ response, request }: HttpContextContract) {
    const payload = await request.validate(TypePaymentValidator)

    const typePayment = await TypePayment.create(payload)

    response.status(201).json({ typePayment })
  }

  public async update({ response, request }: HttpContextContract) {
    const payload = await request.validate(TypePaymentValidator)
    const { id } = request.params()
    const typePayment = await TypePayment.find(id)

    if (!typePayment) {
      throw new Error('TypePayment not found')
    }

    await typePayment.merge(payload).save()

    response.status(200).json({ typePayment })
  }

  public async destroy({ response, request }: HttpContextContract) {
    const { id } = request.params()
    const typePayment = await TypePayment.find(id)

    if (!typePayment) {
      throw new Error('TypePayment not found')
    }

    await typePayment.delete()

    response.status(204)
  }
}
