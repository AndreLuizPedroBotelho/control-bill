import { BaseModel, BelongsTo, beforeSave, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import TypePayment from './TypePayment'
import Bill from './Bill'
import CamelCaseNamingStrategy from 'App/Strategies/CamelCaseNamingStrategy'

export default class Payment extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy()

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public amount: number

  @column()
  public paid: boolean

  @column()
  public dateConfirmPaid?: string | null

  @column()
  public month: number

  @column()
  public year: number

  @column()
  public billId: string

  @column()
  public typePaymentId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => TypePayment)
  public typePayment: BelongsTo<typeof TypePayment>

  @belongsTo(() => Bill)
  public bill: BelongsTo<typeof Bill>

  @beforeSave()
  public static async addDateConfirmPaid(payment: Payment) {
    payment.dateConfirmPaid = payment.paid ? DateTime.now().toISODate() : null
  }
}
