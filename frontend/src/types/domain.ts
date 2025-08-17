export type AsyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type CatalogItem = {
  id: number
  name: string
}

export type Planting = {
  id: number
  farmId: number
  harvest: CatalogItem
  crop: CatalogItem
  createdAt: string
  updatedAt: string | null
}

export type Farm = {
  id: number
  producerId: number
  name: string
  city: string
  state: string
  totalArea: number
  arableArea: number
  vegetationArea: number
  plantings?: Planting[]
  createdAt: string
  updatedAt: string | null
}

export type Producer = {
  id: number
  document: string
  documentType: 'CPF' | 'CNPJ'
  name: string
  farms?: Farm[]
  farmsCount?: number
  createdAt: string
  updatedAt: string | null
}

export type ProducerInput = {
  document: string
  name: string
}

export type FarmInput = {
  name: string
  city: string
  state: string
  totalArea: number
  arableArea: number
  vegetationArea: number
}

export type PlantingInput = {
  harvest: string
  crop: string
}

export type PaginationMeta = {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage?: number
}

export type DashboardData = {
  summary: {
    totalFarms: number
    totalHectares: number
  }
  charts: {
    farmsByState: Array<{ state: string; total: number }>
    crops: Array<{ crop: string; total: number }>
    landUse: Array<{ type: string; area: number }>
  }
}
