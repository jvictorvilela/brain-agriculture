import RuralProducerService from '#services/rural_producer_service'
import { presentProducer, presentProducerSummary } from '#services/resource_presenter'
import {
  createRuralProducerValidator,
  listRuralProducersValidator,
  updateRuralProducerValidator,
} from '#validators/rural_producer'
import type { HttpContext } from '@adonisjs/core/http'

export default class RuralProducersController {
  private readonly service = new RuralProducerService()

  async index({ request }: HttpContext) {
    const {
      page = 1,
      perPage = 20,
      search,
    } = await request.validateUsing(listRuralProducersValidator, { data: request.qs() })
    const producers = await this.service.list(page, perPage, search)

    return {
      data: producers.all().map((producer) => presentProducerSummary(producer)),
      meta: producers.getMeta(),
    }
  }

  async store({ request, response, logger }: HttpContext) {
    const payload = await request.validateUsing(createRuralProducerValidator)
    const producer = await this.service.create(payload)

    logger.info({ producerId: producer.id }, 'Rural producer created')
    return response.created({ data: presentProducer(producer) })
  }

  async show({ params }: HttpContext) {
    const producer = await this.service.find(Number(params.id))
    return { data: presentProducer(producer) }
  }

  async update({ params, request, logger }: HttpContext) {
    const payload = await request.validateUsing(updateRuralProducerValidator)
    const producer = await this.service.update(Number(params.id), payload)

    logger.info({ producerId: producer.id }, 'Rural producer updated')
    return { data: presentProducer(producer) }
  }

  async destroy({ params, response, logger }: HttpContext) {
    const producerId = Number(params.id)
    await this.service.delete(producerId)

    logger.info({ producerId }, 'Rural producer deleted')
    return response.noContent()
  }
}
