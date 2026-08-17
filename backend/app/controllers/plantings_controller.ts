import PlantingService from '#services/planting_service'
import { presentPlanting } from '#services/resource_presenter'
import { createPlantingValidator } from '#validators/planting'
import type { HttpContext } from '@adonisjs/core/http'

export default class PlantingsController {
  private readonly service = new PlantingService()

  async store({ params, request, response, logger }: HttpContext) {
    const payload = await request.validateUsing(createPlantingValidator)
    const planting = await this.service.create(Number(params.farmId), payload)

    logger.info({ farmId: planting.farmId, plantingId: planting.id }, 'Planting created')
    return response.created({ data: presentPlanting(planting) })
  }

  async destroy({ params, response, logger }: HttpContext) {
    const plantingId = Number(params.id)
    await this.service.delete(plantingId)

    logger.info({ plantingId }, 'Planting deleted')
    return response.noContent()
  }
}
