import Farm from '#models/farm'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class RuralProducer extends BaseModel {
  static table = 'rural_producers'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare document: string

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Farm, { foreignKey: 'producerId' })
  declare farms: HasMany<typeof Farm>
}
