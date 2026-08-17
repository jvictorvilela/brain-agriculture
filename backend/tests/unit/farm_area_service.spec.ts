import { BusinessRuleException } from '#exceptions/api_exception'
import { ensureValidFarmAreas } from '#services/farm_area_service'
import { test } from '@japa/runner'

test.group('Farm area service', () => {
  test('accepts areas whose sum equals the total area', ({ assert }) => {
    assert.doesNotThrow(() => {
      ensureValidFarmAreas({ totalArea: 100, arableArea: 70, vegetationArea: 30 })
    })
  })

  test('rejects areas whose sum exceeds the total area', ({ assert }) => {
    assert.throws(
      () => ensureValidFarmAreas({ totalArea: 100, arableArea: 80, vegetationArea: 30 }),
      BusinessRuleException
    )
  })
})
