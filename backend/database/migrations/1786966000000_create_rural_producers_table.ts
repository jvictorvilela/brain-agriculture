import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rural_producers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('document', 14).notNullable().unique()
      table.string('name', 150).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()

      table.check('length(document) IN (11, 14)', {}, 'rural_producers_document_length_check')
      table.index(['name'], 'rural_producers_name_index')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
