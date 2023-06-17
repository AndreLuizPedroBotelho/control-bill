import { BaseModel, BelongsTo, column, belongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import TypePayment from './TypePayment'
import CamelCaseNamingStrategy from 'App/Strategies/CamelCaseNamingStrategy' // 👈 our strategy
import Payment from './Payment'

export default class Bill extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy()

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public amount: number

  @column()
  public recurrent: boolean

  @column()
  public userId: string

  @column()
  public typePaymentId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => TypePayment)
  public typePayment: BelongsTo<typeof TypePayment>

  @hasMany(() => Payment)
  public payments: HasMany<typeof Payment>
}
