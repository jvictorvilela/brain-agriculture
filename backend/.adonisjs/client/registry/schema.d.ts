/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'health.show': {
    methods: ["GET","HEAD"]
    pattern: '/health'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/health_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/health_controller').default['show']>>>
    }
  }
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_tokens.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'profile.access_tokens.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/account/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
    }
  }
  'producers.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/producers'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/rural_producer').listRuralProducersValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rural_producers_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rural_producers_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'producers.store': {
    methods: ["POST"]
    pattern: '/api/v1/producers'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/rural_producer').createRuralProducerValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/rural_producer').createRuralProducerValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rural_producers_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rural_producers_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'producers.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/producers/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rural_producers_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rural_producers_controller').default['show']>>>
    }
  }
  'producers.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/producers/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/rural_producer').updateRuralProducerValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/rural_producer').updateRuralProducerValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rural_producers_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rural_producers_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'producers.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/producers/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/rural_producers_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/rural_producers_controller').default['destroy']>>>
    }
  }
  'producers.farms.store': {
    methods: ["POST"]
    pattern: '/api/v1/producers/:producerId/farms'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/farm').createFarmValidator)>>
      paramsTuple: [ParamValue]
      params: { producerId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/farm').createFarmValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/farms_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/farms_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'farms.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/farms/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/farms_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/farms_controller').default['show']>>>
    }
  }
  'farms.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/farms/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/farm').updateFarmValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/farm').updateFarmValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/farms_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/farms_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'farms.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/farms/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/farms_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/farms_controller').default['destroy']>>>
    }
  }
  'plantings.store': {
    methods: ["POST"]
    pattern: '/api/v1/farms/:farmId/plantings'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/planting').createPlantingValidator)>>
      paramsTuple: [ParamValue]
      params: { farmId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/planting').createPlantingValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/plantings_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/plantings_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'plantings.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/plantings/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/plantings_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/plantings_controller').default['destroy']>>>
    }
  }
  'catalogs.harvests': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/catalogs/harvests'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/catalogs_controller').default['harvests']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/catalogs_controller').default['harvests']>>>
    }
  }
  'catalogs.crops': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/catalogs/crops'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/catalogs_controller').default['crops']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/catalogs_controller').default['crops']>>>
    }
  }
  'dashboard.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/dashboard'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['show']>>>
    }
  }
}
