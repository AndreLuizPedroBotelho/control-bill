import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bill from 'App/Models/Bill'
import BillValidator from 'App/Validators/BillValidator'

export default class BillsController {
  public async index({ response, request, auth }: HttpContextContract) {
    const { search, page } = request.qs()
    const userId = auth.user!.id

    const data = await Bill.query()
      .where('userId', userId)
      .if(search, (query) => {
        query.whereLike('name', `%${search}%`)
      })
      .preload('typePayment')

      .paginate(page || 1)

    response.status(200).json(data.serialize())
  }
  public async show({ response, request }: HttpContextContract) {
    const { id } = request.params()
    const bill = await Bill.find(id)

    if (!bill) {
      throw new Error('Bill not found')
    }

    response.status(200).json({ bill })
  }
  public async store({ response, request, auth }: HttpContextContract) {
    const payload = await request.validate(BillValidator)

    const bill = await Bill.create({ userId: auth.user!.id, ...payload })

    response.status(201).json({ bill })
  }

  public async update({ response, request }: HttpContextContract) {
    const payload = await request.validate(BillValidator)
    const { id } = request.params()
    const bill = await Bill.find(id)

    if (!bill) {
      throw new Error('Bill not found')
    }

    await bill.merge(payload).save()

    response.status(200).json({ bill })
  }

  public async destroy({ response, request }: HttpContextContract) {
    const { id } = request.params()
    const bill = await Bill.find(id)

    if (!bill) {
      throw new Error('Bill not found')
    }

    await bill.delete()

    response.status(204)
  }
}
