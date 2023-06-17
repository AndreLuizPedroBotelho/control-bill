import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserChangeValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string.optional(),
    password: schema.string.optional([
      rules.confirmed('passwordConfirmation'),
      rules.minLength(4),
    ]),
    oldPassword: schema.string.optional([
      rules.minLength(4),
      rules.requiredIfExists('password')
    ]),
  })

  public messages: CustomMessages = {}
}
