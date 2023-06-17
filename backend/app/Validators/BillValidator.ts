import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BillValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string.optional([rules.requiredIfExists('create')]),
    amount: schema.number.optional([rules.requiredIfExists('create')]),
    recurrent: schema.boolean.optional([rules.requiredIfExists('create')]),
    typePaymentId: schema.string.optional([rules.requiredIfExists('create'), rules.uuid()]),
  })

  public messages: CustomMessages = {}
}
