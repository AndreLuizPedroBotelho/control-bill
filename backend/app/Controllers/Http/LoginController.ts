import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/LoginValidator'

export default class LoginController {
  public async login({ response, request, auth }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)

    const token = await auth.use('api').attempt(email, password)

    const user = auth.use('api').user?.serialize({
      fields: {
        omit: ['createdAt', 'updatedAt'],
      },
    })

    response.status(200).json({ token, user })
  }

  public async reset({ response }: HttpContextContract) { }
}
