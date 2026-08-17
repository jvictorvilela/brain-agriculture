import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'crops'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name', 100).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })

    this.schema.raw('CREATE UNIQUE INDEX crops_name_lower_unique ON crops (LOWER(name))')
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
