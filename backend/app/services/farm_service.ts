import { BusinessRuleException, ResourceNotFoundException } from '#exceptions/api_exception'
import Farm from '#models/farm'
import RuralProducer from '#models/rural_producer'
import { ensureValidFarmAreas } from '#services/farm_area_service'

export type FarmPayload = {
  name: string
  city: string
  state: string
  totalArea: number
  arableArea: number
  vegetationArea: number
}

export default class FarmService {
  async find(id: number) {
    const farm = await Farm.query()
      .where('id', id)
      .preload('plantings', (plantingQuery) => {
        plantingQuery.orderBy('id', 'asc').preload('harvest').preload('crop')
      })
      .first()

    if (!farm) {
      throw new ResourceNotFoundException('Propriedade rural não encontrada')
    }

    return farm
  }

  async create(producerId: number, payload: FarmPayload) {
    const producer = await RuralProducer.find(producerId)

    if (!producer) {
      throw new ResourceNotFoundException('Produtor rural não encontrado')
    }

    ensureValidFarmAreas(payload)
    return Farm.create({ ...payload, producerId })
  }

  async update(id: number, payload: Partial<FarmPayload>) {
    if (Object.keys(payload).length === 0) {
      throw new BusinessRuleException('Informe ao menos um campo para atualizar a propriedade')
    }

    const farm = await this.find(id)
    const areas = {
      totalArea: payload.totalArea ?? farm.totalArea,
      arableArea: payload.arableArea ?? farm.arableArea,
      vegetationArea: payload.vegetationArea ?? farm.vegetationArea,
    }

    ensureValidFarmAreas(areas)
    farm.merge(payload)
    await farm.save()
    return farm
  }

  async delete(id: number) {
    const farm = await this.find(id)
    await farm.delete()
  }
}
