/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  health: {
    show: typeof routes['health.show']
  }
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
  producers: {
    index: typeof routes['producers.index']
    store: typeof routes['producers.store']
    show: typeof routes['producers.show']
    update: typeof routes['producers.update']
    destroy: typeof routes['producers.destroy']
    farms: {
      store: typeof routes['producers.farms.store']
    }
  }
  farms: {
    show: typeof routes['farms.show']
    update: typeof routes['farms.update']
    destroy: typeof routes['farms.destroy']
  }
  plantings: {
    store: typeof routes['plantings.store']
    destroy: typeof routes['plantings.destroy']
  }
  catalogs: {
    harvests: typeof routes['catalogs.harvests']
    crops: typeof routes['catalogs.crops']
  }
  dashboard: {
    show: typeof routes['dashboard.show']
  }
}
