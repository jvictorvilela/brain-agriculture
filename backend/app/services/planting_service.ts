import { ConflictException, ResourceNotFoundException } from '#exceptions/api_exception'
import Crop from '#models/crop'
import Farm from '#models/farm'
import Harvest from '#models/harvest'
import Planting from '#models/planting'
import db from '@adonisjs/lucid/services/db'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'
import { DateTime } from 'luxon'

type PlantingPayload = {
  harvest: string
  crop: string
}

const normalizeName = (value: string) => value.replace(/\s+/g, ' ').trim()

export default class PlantingService {
  async create(farmId: number, payload: PlantingPayload) {
    if (!(await Farm.find(farmId))) {
      throw new ResourceNotFoundException('Propriedade rural não encontrada')
    }

    let planting: Planting

    try {
      planting = await db.transaction(async (trx) => {
        const harvest = await this.findOrCreateHarvest(trx, normalizeName(payload.harvest))
        const crop = await this.findOrCreateCrop(trx, normalizeName(payload.crop))
        const existing = await Planting.query({ client: trx })
          .where('farmId', farmId)
          .where('harvestId', harvest.id)
          .where('cropId', crop.id)
          .first()

        if (existing) {
          throw new ConflictException('Esta cultura já está registrada para a propriedade e safra')
        }

        return Planting.create({ farmId, harvestId: harvest.id, cropId: crop.id }, { client: trx })
      })
    } catch (error) {
      if (typeof error === 'object' && error && 'code' in error && error.code === '23505') {
        throw new ConflictException('Esta cultura já está registrada para a propriedade e safra')
      }
      throw error
    }

    await planting.load('harvest')
    await planting.load('crop')
    return planting
  }

  async delete(id: number) {
    const planting = await Planting.find(id)

    if (!planting) {
      throw new ResourceNotFoundException('Plantio não encontrado')
    }

    await planting.delete()
  }

  private async findOrCreateHarvest(trx: TransactionClientContract, name: string) {
    await trx.rawQuery(
      'INSERT INTO harvests (name, created_at) VALUES (?, ?) ON CONFLICT (LOWER(name)) DO NOTHING',
      [name, DateTime.utc().toSQL()]
    )
    return Harvest.query({ client: trx }).whereILike('name', name).firstOrFail()
  }

  private async findOrCreateCrop(trx: TransactionClientContract, name: string) {
    await trx.rawQuery(
      'INSERT INTO crops (name, created_at) VALUES (?, ?) ON CONFLICT (LOWER(name)) DO NOTHING',
      [name, DateTime.utc().toSQL()]
    )
    return Crop.query({ client: trx }).whereILike('name', name).firstOrFail()
  }
}
