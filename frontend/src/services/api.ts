import type {
  CatalogItem,
  DashboardData,
  Farm,
  FarmInput,
  PaginationMeta,
  Planting,
  PlantingInput,
  Producer,
  ProducerInput,
} from '@/types/domain'

type ApiEnvelope<T> = { data: T }
type PaginatedEnvelope<T> = ApiEnvelope<T[]> & { meta: PaginationMeta }

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly details?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api/v1${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  })

  if (response.status === 204) {
    return undefined as T
  }

  const body = (await response.json().catch(() => null)) as {
    message?: string
    errors?: Array<{ message?: string }>
  } | null

  if (!response.ok) {
    const message =
      body?.errors?.[0]?.message ??
      body?.message ??
      'Não foi possível concluir a operação'
    throw new ApiError(message, response.status, body)
  }

  return body as T
}

const json = (value: unknown) => JSON.stringify(value)

export const api = {
  dashboard: () => request<ApiEnvelope<DashboardData>>('/dashboard'),

  listProducers: (page = 1, search = '') => {
    const query = new URLSearchParams({ page: String(page), perPage: '10' })
    if (search) query.set('search', search)
    return request<PaginatedEnvelope<Producer>>(`/producers?${query}`)
  },
  getProducer: (id: number) =>
    request<ApiEnvelope<Producer>>(`/producers/${id}`),
  createProducer: (input: ProducerInput) =>
    request<ApiEnvelope<Producer>>('/producers', {
      method: 'POST',
      body: json(input),
    }),
  updateProducer: (id: number, input: Partial<ProducerInput>) =>
    request<ApiEnvelope<Producer>>(`/producers/${id}`, {
      method: 'PATCH',
      body: json(input),
    }),
  deleteProducer: (id: number) =>
    request<void>(`/producers/${id}`, { method: 'DELETE' }),

  getFarm: (id: number) => request<ApiEnvelope<Farm>>(`/farms/${id}`),
  createFarm: (producerId: number, input: FarmInput) =>
    request<ApiEnvelope<Farm>>(`/producers/${producerId}/farms`, {
      method: 'POST',
      body: json(input),
    }),
  updateFarm: (id: number, input: Partial<FarmInput>) =>
    request<ApiEnvelope<Farm>>(`/farms/${id}`, {
      method: 'PATCH',
      body: json(input),
    }),
  deleteFarm: (id: number) =>
    request<void>(`/farms/${id}`, { method: 'DELETE' }),

  createPlanting: (farmId: number, input: PlantingInput) =>
    request<ApiEnvelope<Planting>>(`/farms/${farmId}/plantings`, {
      method: 'POST',
      body: json(input),
    }),
  deletePlanting: (id: number) =>
    request<void>(`/plantings/${id}`, { method: 'DELETE' }),

  listHarvests: () => request<ApiEnvelope<CatalogItem[]>>('/catalogs/harvests'),
  listCrops: () => request<ApiEnvelope<CatalogItem[]>>('/catalogs/crops'),
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Ocorreu um erro inesperado'
}
