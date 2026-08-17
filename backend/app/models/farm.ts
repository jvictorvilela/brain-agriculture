import Planting from '#models/planting'
import RuralProducer from '#models/rural_producer'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

const consumeDecimal = (value: string | number) => Number(value)

export default class Farm extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare producerId: number

  @column()
  declare name: string

  @column()
  declare city: string

  @column()
  declare state: string

  @column({ consume: consumeDecimal })
  declare totalArea: number

  @column({ consume: consumeDecimal })
  declare arableArea: number

  @column({ consume: consumeDecimal })
  declare vegetationArea: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => RuralProducer, { foreignKey: 'producerId' })
  declare producer: BelongsTo<typeof RuralProducer>

  @hasMany(() => Planting, { foreignKey: 'farmId' })
  declare plantings: HasMany<typeof Planting>
}
