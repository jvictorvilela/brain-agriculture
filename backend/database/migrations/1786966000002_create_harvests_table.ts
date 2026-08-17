import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'harvests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name', 100).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })

    this.schema.raw('CREATE UNIQUE INDEX harvests_name_lower_unique ON harvests (LOWER(name))')
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
