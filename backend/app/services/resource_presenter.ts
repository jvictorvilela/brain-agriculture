import type Farm from '#models/farm'
import type Planting from '#models/planting'
import type RuralProducer from '#models/rural_producer'
import { documentType } from '#services/document_service'

export function presentPlanting(planting: Planting) {
  return {
    id: planting.id,
    farmId: planting.farmId,
    harvest: planting.harvest
      ? { id: planting.harvest.id, name: planting.harvest.name }
      : undefined,
    crop: planting.crop ? { id: planting.crop.id, name: planting.crop.name } : undefined,
    createdAt: planting.createdAt.toISO(),
    updatedAt: planting.updatedAt?.toISO() ?? null,
  }
}

export function presentFarm(farm: Farm) {
  return {
    id: farm.id,
    producerId: farm.producerId,
    name: farm.name,
    city: farm.city,
    state: farm.state,
    totalArea: farm.totalArea,
    arableArea: farm.arableArea,
    vegetationArea: farm.vegetationArea,
    ...(farm.$preloaded.plantings
      ? { plantings: farm.plantings.map((planting) => presentPlanting(planting)) }
      : {}),
    createdAt: farm.createdAt.toISO(),
    updatedAt: farm.updatedAt?.toISO() ?? null,
  }
}

export function presentProducer(producer: RuralProducer) {
  return {
    id: producer.id,
    document: producer.document,
    documentType: documentType(producer.document),
    name: producer.name,
    ...(producer.$preloaded.farms
      ? { farms: producer.farms.map((farm) => presentFarm(farm)) }
      : {}),
    createdAt: producer.createdAt.toISO(),
    updatedAt: producer.updatedAt?.toISO() ?? null,
  }
}

export function presentProducerSummary(producer: RuralProducer) {
  return {
    ...presentProducer(producer),
    farmsCount: Number(producer.$extras.farms_count ?? 0),
  }
}
