import vine from '@vinejs/vine'

export const createPlantingValidator = vine.create({
  harvest: vine.string().trim().minLength(2).maxLength(100),
  crop: vine.string().trim().minLength(2).maxLength(100),
})
