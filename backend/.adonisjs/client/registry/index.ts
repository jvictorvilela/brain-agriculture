/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'health.show': {
    methods: ["GET","HEAD"],
    pattern: '/health',
    tokens: [{"old":"/health","type":0,"val":"health","end":""}],
    types: placeholder as Registry['health.show']['types'],
  },
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_tokens.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_tokens.store']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.access_tokens.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/account/logout',
    tokens: [{"old":"/api/v1/account/logout","type":0,"val":"api","end":""},{"old":"/api/v1/account/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/account/logout","type":0,"val":"account","end":""},{"old":"/api/v1/account/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['profile.access_tokens.destroy']['types'],
  },
  'producers.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/producers',
    tokens: [{"old":"/api/v1/producers","type":0,"val":"api","end":""},{"old":"/api/v1/producers","type":0,"val":"v1","end":""},{"old":"/api/v1/producers","type":0,"val":"producers","end":""}],
    types: placeholder as Registry['producers.index']['types'],
  },
  'producers.store': {
    methods: ["POST"],
    pattern: '/api/v1/producers',
    tokens: [{"old":"/api/v1/producers","type":0,"val":"api","end":""},{"old":"/api/v1/producers","type":0,"val":"v1","end":""},{"old":"/api/v1/producers","type":0,"val":"producers","end":""}],
    types: placeholder as Registry['producers.store']['types'],
  },
  'producers.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/producers/:id',
    tokens: [{"old":"/api/v1/producers/:id","type":0,"val":"api","end":""},{"old":"/api/v1/producers/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/producers/:id","type":0,"val":"producers","end":""},{"old":"/api/v1/producers/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['producers.show']['types'],
  },
  'producers.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/producers/:id',
    tokens: [{"old":"/api/v1/producers/:id","type":0,"val":"api","end":""},{"old":"/api/v1/producers/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/producers/:id","type":0,"val":"producers","end":""},{"old":"/api/v1/producers/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['producers.update']['types'],
  },
  'producers.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/producers/:id',
    tokens: [{"old":"/api/v1/producers/:id","type":0,"val":"api","end":""},{"old":"/api/v1/producers/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/producers/:id","type":0,"val":"producers","end":""},{"old":"/api/v1/producers/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['producers.destroy']['types'],
  },
  'producers.farms.store': {
    methods: ["POST"],
    pattern: '/api/v1/producers/:producerId/farms',
    tokens: [{"old":"/api/v1/producers/:producerId/farms","type":0,"val":"api","end":""},{"old":"/api/v1/producers/:producerId/farms","type":0,"val":"v1","end":""},{"old":"/api/v1/producers/:producerId/farms","type":0,"val":"producers","end":""},{"old":"/api/v1/producers/:producerId/farms","type":1,"val":"producerId","end":""},{"old":"/api/v1/producers/:producerId/farms","type":0,"val":"farms","end":""}],
    types: placeholder as Registry['producers.farms.store']['types'],
  },
  'farms.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/farms/:id',
    tokens: [{"old":"/api/v1/farms/:id","type":0,"val":"api","end":""},{"old":"/api/v1/farms/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/farms/:id","type":0,"val":"farms","end":""},{"old":"/api/v1/farms/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['farms.show']['types'],
  },
  'farms.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/farms/:id',
    tokens: [{"old":"/api/v1/farms/:id","type":0,"val":"api","end":""},{"old":"/api/v1/farms/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/farms/:id","type":0,"val":"farms","end":""},{"old":"/api/v1/farms/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['farms.update']['types'],
  },
  'farms.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/farms/:id',
    tokens: [{"old":"/api/v1/farms/:id","type":0,"val":"api","end":""},{"old":"/api/v1/farms/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/farms/:id","type":0,"val":"farms","end":""},{"old":"/api/v1/farms/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['farms.destroy']['types'],
  },
  'plantings.store': {
    methods: ["POST"],
    pattern: '/api/v1/farms/:farmId/plantings',
    tokens: [{"old":"/api/v1/farms/:farmId/plantings","type":0,"val":"api","end":""},{"old":"/api/v1/farms/:farmId/plantings","type":0,"val":"v1","end":""},{"old":"/api/v1/farms/:farmId/plantings","type":0,"val":"farms","end":""},{"old":"/api/v1/farms/:farmId/plantings","type":1,"val":"farmId","end":""},{"old":"/api/v1/farms/:farmId/plantings","type":0,"val":"plantings","end":""}],
    types: placeholder as Registry['plantings.store']['types'],
  },
  'plantings.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/plantings/:id',
    tokens: [{"old":"/api/v1/plantings/:id","type":0,"val":"api","end":""},{"old":"/api/v1/plantings/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/plantings/:id","type":0,"val":"plantings","end":""},{"old":"/api/v1/plantings/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['plantings.destroy']['types'],
  },
  'catalogs.harvests': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/catalogs/harvests',
    tokens: [{"old":"/api/v1/catalogs/harvests","type":0,"val":"api","end":""},{"old":"/api/v1/catalogs/harvests","type":0,"val":"v1","end":""},{"old":"/api/v1/catalogs/harvests","type":0,"val":"catalogs","end":""},{"old":"/api/v1/catalogs/harvests","type":0,"val":"harvests","end":""}],
    types: placeholder as Registry['catalogs.harvests']['types'],
  },
  'catalogs.crops': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/catalogs/crops',
    tokens: [{"old":"/api/v1/catalogs/crops","type":0,"val":"api","end":""},{"old":"/api/v1/catalogs/crops","type":0,"val":"v1","end":""},{"old":"/api/v1/catalogs/crops","type":0,"val":"catalogs","end":""},{"old":"/api/v1/catalogs/crops","type":0,"val":"crops","end":""}],
    types: placeholder as Registry['catalogs.crops']['types'],
  },
  'dashboard.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard',
    tokens: [{"old":"/api/v1/dashboard","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['dashboard.show']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
