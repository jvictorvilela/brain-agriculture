import { BusinessRuleException } from '#exceptions/api_exception'

export type FarmAreas = {
  totalArea: number
  arableArea: number
  vegetationArea: number
}

export function ensureValidFarmAreas(areas: FarmAreas) {
  if (areas.arableArea + areas.vegetationArea > areas.totalArea) {
    throw new BusinessRuleException(
      'A soma das áreas agricultável e de vegetação não pode ultrapassar a área total'
    )
  }
}
