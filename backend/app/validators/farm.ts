import vine from '@vinejs/vine'

export const brazilianStates = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
] as const

const area = () => vine.number().nonNegative().decimal([0, 2]).max(9_999_999_999.99)

export const createFarmValidator = vine.create({
  name: vine.string().trim().minLength(2).maxLength(150),
  city: vine.string().trim().minLength(2).maxLength(100),
  state: vine.enum(brazilianStates),
  totalArea: area().positive(),
  arableArea: area(),
  vegetationArea: area(),
})

export const updateFarmValidator = vine.create({
  name: vine.string().trim().minLength(2).maxLength(150).optional(),
  city: vine.string().trim().minLength(2).maxLength(100).optional(),
  state: vine.enum(brazilianStates).optional(),
  totalArea: area().positive().optional(),
  arableArea: area().optional(),
  vegetationArea: area().optional(),
})
