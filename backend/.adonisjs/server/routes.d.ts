import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'health.show': { paramsTuple?: []; params?: {} }
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'producers.index': { paramsTuple?: []; params?: {} }
    'producers.store': { paramsTuple?: []; params?: {} }
    'producers.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'producers.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'producers.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'producers.farms.store': { paramsTuple: [ParamValue]; params: {'producerId': ParamValue} }
    'farms.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'farms.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'farms.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'plantings.store': { paramsTuple: [ParamValue]; params: {'farmId': ParamValue} }
    'plantings.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalogs.harvests': { paramsTuple?: []; params?: {} }
    'catalogs.crops': { paramsTuple?: []; params?: {} }
    'dashboard.show': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'health.show': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'producers.index': { paramsTuple?: []; params?: {} }
    'producers.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'farms.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalogs.harvests': { paramsTuple?: []; params?: {} }
    'catalogs.crops': { paramsTuple?: []; params?: {} }
    'dashboard.show': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'health.show': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'producers.index': { paramsTuple?: []; params?: {} }
    'producers.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'farms.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalogs.harvests': { paramsTuple?: []; params?: {} }
    'catalogs.crops': { paramsTuple?: []; params?: {} }
    'dashboard.show': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'producers.store': { paramsTuple?: []; params?: {} }
    'producers.farms.store': { paramsTuple: [ParamValue]; params: {'producerId': ParamValue} }
    'plantings.store': { paramsTuple: [ParamValue]; params: {'farmId': ParamValue} }
  }
  PATCH: {
    'producers.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'farms.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'producers.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'farms.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'plantings.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}