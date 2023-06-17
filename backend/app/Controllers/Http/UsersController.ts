import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/UserValidator'
import User from '../../Models/User'
import UserChangeValidator from 'App/Validators/UserChangeValidator'

export default class UsersController {
  public async index({ response, request }: HttpContextContract) {
    const { search, page } = request.qs()
    const data = await User.query()
      .if(search, (query) => {
        query.whereLike('name', `%${search}%`)
      })
      .paginate(page || 1)

    response.status(200).json(data)
  }

  public async show({ response, request }: HttpContextContract) {
    const { id } = request.params()
    const user = await User.find(id)

    if (!user) {
      throw new Error('User not found')
    }

    response.status(200).json({ user })
  }

  public async store({ response, request }: HttpContextContract) {
    const payload = await request.validate(UserValidator)

    const user = await User.create(payload)

    response.status(201).json({ user })
  }

  public async update({ response, request, auth }: HttpContextContract) {
    const payload = await request.validate(UserChangeValidator)
    const { id } = request.params()
    const user = await User.find(id)

    if (!user) {
      throw new Error('User not found')
    }

    if (payload.password) {
      await auth.use('api').attempt(user.email, payload.oldPassword)
      delete payload.oldPassword
    }

    await user.merge(payload).save()

    response.status(200).json({ user })
  }
  public async destroy({ response, request }: HttpContextContract) {
    const { id } = request.params()
    const user = await User.find(id)

    if (!user) {
      throw new Error('User not found')
    }

    await user.delete()

    response.status(204)
  }



}
