import { isValidDocument, normalizeDocument } from '#services/document_service'
import vine from '@vinejs/vine'

const validDocument = vine.createRule((value: unknown, _, field) => {
  if (typeof value !== 'string' || !isValidDocument(value)) {
    field.report('O campo {{ field }} deve conter um CPF ou CNPJ válido', 'document', field)
  }
})

const document = () =>
  vine
    .string()
    .trim()
    .parse((value) => (typeof value === 'string' ? normalizeDocument(value) : value))
    .use(validDocument())

export const createRuralProducerValidator = vine.create({
  document: document(),
  name: vine.string().trim().minLength(2).maxLength(150),
})

export const updateRuralProducerValidator = vine.create({
  document: document().optional(),
  name: vine.string().trim().minLength(2).maxLength(150).optional(),
})

export const listRuralProducersValidator = vine.create({
  page: vine.number().withoutDecimals().positive().optional(),
  perPage: vine.number().withoutDecimals().range([1, 100]).optional(),
  search: vine.string().trim().maxLength(150).optional(),
})
