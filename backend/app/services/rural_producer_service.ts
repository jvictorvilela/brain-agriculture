import {
  BusinessRuleException,
  ConflictException,
  ResourceNotFoundException,
} from '#exceptions/api_exception'
import RuralProducer from '#models/rural_producer'

type ProducerPayload = {
  document: string
  name: string
}

export default class RuralProducerService {
  async list(page = 1, perPage = 20, search?: string) {
    const query = RuralProducer.query().withCount('farms').orderBy('name', 'asc')

    if (search) {
      query.where((builder) => {
        builder.whereILike('name', `%${search}%`).orWhereILike('document', `%${search}%`)
      })
    }

    return query.paginate(page, perPage)
  }

  async find(id: number) {
    const producer = await RuralProducer.query()
      .where('id', id)
      .preload('farms', (farmQuery) => {
        farmQuery.orderBy('name', 'asc').preload('plantings', (plantingQuery) => {
          plantingQuery.orderBy('id', 'asc').preload('harvest').preload('crop')
        })
      })
      .first()

    if (!producer) {
      throw new ResourceNotFoundException('Produtor rural não encontrado')
    }

    return producer
  }

  async create(payload: ProducerPayload) {
    await this.ensureDocumentAvailable(payload.document)

    try {
      return await RuralProducer.create(payload)
    } catch (error) {
      this.rethrowDocumentConflict(error)
      throw error
    }
  }

  async update(id: number, payload: Partial<ProducerPayload>) {
    if (Object.keys(payload).length === 0) {
      throw new BusinessRuleException('Informe ao menos um campo para atualizar o produtor')
    }

    const producer = await this.find(id)

    if (payload.document && payload.document !== producer.document) {
      await this.ensureDocumentAvailable(payload.document, id)
    }

    producer.merge(payload)

    try {
      await producer.save()
    } catch (error) {
      this.rethrowDocumentConflict(error)
      throw error
    }

    return producer
  }

  async delete(id: number) {
    const producer = await this.find(id)
    await producer.delete()
  }

  private async ensureDocumentAvailable(document: string, ignoredId?: number) {
    const query = RuralProducer.query().where('document', document)

    if (ignoredId) {
      query.whereNot('id', ignoredId)
    }

    if (await query.first()) {
      throw new ConflictException('Já existe um produtor cadastrado com este CPF ou CNPJ')
    }
  }

  private rethrowDocumentConflict(error: unknown): void {
    if (typeof error === 'object' && error && 'code' in error && error.code === '23505') {
      throw new ConflictException('Já existe um produtor cadastrado com este CPF ou CNPJ')
    }
  }
}
