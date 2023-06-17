import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PaymentValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string.optional([rules.requiredIfExists('create')]),
    amount: schema.number.optional([rules.requiredIfExists('create')]),
    paid: schema.boolean.optional([rules.requiredIfExists('create')]),
    billId: schema.string.optional([rules.requiredIfExists('create'), rules.uuid()]),
    typePaymentId: schema.string.optional([rules.requiredIfExists('create'), rules.uuid()]),
    month: schema.number.optional([rules.range(1, 12)]),
    year: schema.number.optional([rules.range(2000, 2999)]),
  })

  public messages: CustomMessages = {}
}
