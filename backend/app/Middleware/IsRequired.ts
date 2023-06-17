import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IsRequired {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    const payload = { ...request.body(), create: true }
    request.updateBody(payload)

    await next()
  }
}
