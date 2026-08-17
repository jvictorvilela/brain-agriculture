import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'plantings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('farm_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('farms')
        .onDelete('CASCADE')
      table
        .integer('harvest_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('harvests')
        .onDelete('RESTRICT')
      table
        .integer('crop_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('crops')
        .onDelete('RESTRICT')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()

      table.unique(['farm_id', 'harvest_id', 'crop_id'], {
        indexName: 'plantings_farm_harvest_crop_unique',
      })
      table.index(['farm_id'], 'plantings_farm_id_index')
      table.index(['harvest_id'], 'plantings_harvest_id_index')
      table.index(['crop_id'], 'plantings_crop_id_index')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
