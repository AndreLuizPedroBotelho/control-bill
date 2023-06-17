import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'payments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.raw('uuid_generate_v4()'))
      table.string('name')
      table.decimal('amount', 8, 2)
      table.boolean('paid')
      table.date('date_confirm_paid')
      table.integer('month')
      table.integer('year')

      table.uuid('bill_id').references('id').inTable('bills')
      table.uuid('type_payment_id').references('id').inTable('type_payments')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
