import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'farms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('producer_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('rural_producers')
        .onDelete('CASCADE')
      table.string('name', 150).notNullable()
      table.string('city', 100).notNullable()
      table.string('state', 2).notNullable()
      table.decimal('total_area', 12, 2).notNullable()
      table.decimal('arable_area', 12, 2).notNullable()
      table.decimal('vegetation_area', 12, 2).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()

      table.check('total_area > 0', {}, 'farms_total_area_positive_check')
      table.check('arable_area >= 0', {}, 'farms_arable_area_non_negative_check')
      table.check('vegetation_area >= 0', {}, 'farms_vegetation_area_non_negative_check')
      table.check(
        'arable_area + vegetation_area <= total_area',
        {},
        'farms_areas_within_total_check'
      )
      table.check(
        "state IN ('AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO')",
        {},
        'farms_state_check'
      )
      table.index(['producer_id'], 'farms_producer_id_index')
      table.index(['state'], 'farms_state_index')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
