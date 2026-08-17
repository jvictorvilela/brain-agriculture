import FarmService from '#services/farm_service'
import { presentFarm } from '#services/resource_presenter'
import { createFarmValidator, updateFarmValidator } from '#validators/farm'
import type { HttpContext } from '@adonisjs/core/http'

export default class FarmsController {
  private readonly service = new FarmService()

  async store({ params, request, response, logger }: HttpContext) {
    const payload = await request.validateUsing(createFarmValidator)
    const farm = await this.service.create(Number(params.producerId), payload)

    logger.info({ producerId: farm.producerId, farmId: farm.id }, 'Farm created')
    return response.created({ data: presentFarm(farm) })
  }

  async show({ params }: HttpContext) {
    const farm = await this.service.find(Number(params.id))
    return { data: presentFarm(farm) }
  }

  async update({ params, request, logger }: HttpContext) {
    const payload = await request.validateUsing(updateFarmValidator)
    const farm = await this.service.update(Number(params.id), payload)

    logger.info({ producerId: farm.producerId, farmId: farm.id }, 'Farm updated')
    return { data: presentFarm(farm) }
  }

  async destroy({ params, response, logger }: HttpContext) {
    const farmId = Number(params.id)
    await this.service.delete(farmId)

    logger.info({ farmId }, 'Farm deleted')
    return response.noContent()
  }
}
