import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string.optional([rules.requiredIfExists('create')]),
    email: schema.string.optional([
      rules.requiredIfExists('create'),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    newPassword: schema.string.optional([
      rules.minLength(4),
    ]),
    password: schema.string.optional([
      rules.requiredIfExists('create'),
      rules.confirmed('passwordConfirmation'),
      rules.minLength(4),
    ]),
  })

  public messages: CustomMessages = {}
}
