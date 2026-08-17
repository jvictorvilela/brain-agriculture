import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

type ProducerResponseBody = {
  data: {
    id: number
    document: string
    documentType: string
    name: string
    farms: Array<{
      plantings: Array<{ crop: { name: string } }>
    }>
  }
}

test.group('Rural producers API', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('creates and returns a producer with a normalized CPF', async ({ client, assert }) => {
    const response = await client.post('/api/v1/producers').json({
      document: '529.982.247-25',
      name: 'Maria da Silva',
    })

    response.assertStatus(201)
    const body = response.body() as unknown as ProducerResponseBody
    assert.equal(body.data.document, '52998224725')
    assert.equal(body.data.documentType, 'CPF')
  })

  test('rejects an invalid CPF or CNPJ', async ({ client }) => {
    const response = await client.post('/api/v1/producers').json({
      document: '111.111.111-11',
      name: 'Produtor inválido',
    })

    response.assertStatus(422)
  })

  test('rejects duplicate documents', async ({ client }) => {
    const payload = { document: '52998224725', name: 'Maria da Silva' }

    await client.post('/api/v1/producers').json(payload)
    const response = await client.post('/api/v1/producers').json(payload)

    response.assertStatus(409)
    response.assertBodyContains({
      errors: [{ code: 'E_RESOURCE_CONFLICT' }],
    })
  })

  test('manages farms and plantings and updates the dashboard', async ({ client, assert }) => {
    const producerResponse = await client.post('/api/v1/producers').json({
      document: '11222333000181',
      name: 'Cooperativa Horizonte',
    })
    const producerBody = producerResponse.body() as unknown as ProducerResponseBody
    const producerId = producerBody.data.id

    const farmResponse = await client.post(`/api/v1/producers/${producerId}/farms`).json({
      name: 'Fazenda Horizonte',
      city: 'Rio Verde',
      state: 'GO',
      totalArea: 1000.5,
      arableArea: 700.25,
      vegetationArea: 250.25,
    })
    farmResponse.assertStatus(201)
    const farmId = farmResponse.body().data.id

    const plantingResponse = await client.post(`/api/v1/farms/${farmId}/plantings`).json({
      harvest: 'Safra 2025/2026',
      crop: 'Soja',
    })
    plantingResponse.assertStatus(201)

    const duplicatePlanting = await client.post(`/api/v1/farms/${farmId}/plantings`).json({
      harvest: 'safra 2025/2026',
      crop: 'soja',
    })
    duplicatePlanting.assertStatus(409)

    const detailResponse = await client.get(`/api/v1/producers/${producerId}`)
    detailResponse.assertStatus(200)
    const detailBody = detailResponse.body() as unknown as ProducerResponseBody
    assert.equal(detailBody.data.farms[0].plantings[0].crop.name, 'Soja')

    const dashboardResponse = await client.get('/api/v1/dashboard')
    dashboardResponse.assertStatus(200)
    assert.equal(dashboardResponse.body().data.summary.totalFarms, 1)
    assert.equal(dashboardResponse.body().data.summary.totalHectares, 1000.5)
    assert.deepInclude(dashboardResponse.body().data.charts.farmsByState, {
      state: 'GO',
      total: 1,
    })
  })

  test('rejects a farm when mapped areas exceed its total area', async ({ client }) => {
    const producerResponse = await client.post('/api/v1/producers').json({
      document: '52998224725',
      name: 'Maria da Silva',
    })
    const producerBody = producerResponse.body() as unknown as ProducerResponseBody

    const response = await client.post(`/api/v1/producers/${producerBody.data.id}/farms`).json({
      name: 'Fazenda Inválida',
      city: 'Goiânia',
      state: 'GO',
      totalArea: 100,
      arableArea: 80,
      vegetationArea: 30,
    })

    response.assertStatus(422)
    response.assertBodyContains({ errors: [{ code: 'E_BUSINESS_RULE' }] })
  })

  test('updates and deletes a producer', async ({ client, assert }) => {
    const created = await client.post('/api/v1/producers').json({
      document: '52998224725',
      name: 'Maria da Silva',
    })
    const createdBody = created.body() as unknown as ProducerResponseBody
    const producerId = createdBody.data.id

    const updated = await client.patch(`/api/v1/producers/${producerId}`).json({
      name: 'Maria da Silva Souza',
    })
    updated.assertStatus(200)
    const updatedBody = updated.body() as unknown as ProducerResponseBody
    assert.equal(updatedBody.data.name, 'Maria da Silva Souza')

    const deleted = await client.delete(`/api/v1/producers/${producerId}`)
    deleted.assertStatus(204)

    const notFound = await client.get(`/api/v1/producers/${producerId}`)
    notFound.assertStatus(404)
  })
})
