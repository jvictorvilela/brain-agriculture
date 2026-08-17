import Crop from '#models/crop'
import Farm from '#models/farm'
import Harvest from '#models/harvest'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Planting extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare farmId: number

  @column()
  declare harvestId: number

  @column()
  declare cropId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Farm, { foreignKey: 'farmId' })
  declare farm: BelongsTo<typeof Farm>

  @belongsTo(() => Harvest, { foreignKey: 'harvestId' })
  declare harvest: BelongsTo<typeof Harvest>

  @belongsTo(() => Crop, { foreignKey: 'cropId' })
  declare crop: BelongsTo<typeof Crop>
}
