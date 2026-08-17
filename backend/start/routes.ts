/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router.get('/health', [controllers.Health, 'show'])

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

    router
      .group(() => {
        router.get('/', [controllers.RuralProducers, 'index']).as('index')
        router.post('/', [controllers.RuralProducers, 'store']).as('store')
        router.get('/:id', [controllers.RuralProducers, 'show']).as('show')
        router.patch('/:id', [controllers.RuralProducers, 'update']).as('update')
        router.delete('/:id', [controllers.RuralProducers, 'destroy']).as('destroy')
        router.post('/:producerId/farms', [controllers.Farms, 'store']).as('farms.store')
      })
      .prefix('producers')
      .as('producers')

    router.get('/farms/:id', [controllers.Farms, 'show']).as('farms.show')
    router.patch('/farms/:id', [controllers.Farms, 'update']).as('farms.update')
    router.delete('/farms/:id', [controllers.Farms, 'destroy']).as('farms.destroy')
    router.post('/farms/:farmId/plantings', [controllers.Plantings, 'store']).as('plantings.store')
    router.delete('/plantings/:id', [controllers.Plantings, 'destroy']).as('plantings.destroy')

    router.get('/catalogs/harvests', [controllers.Catalogs, 'harvests']).as('catalogs.harvests')
    router.get('/catalogs/crops', [controllers.Catalogs, 'crops']).as('catalogs.crops')
    router.get('/dashboard', [controllers.Dashboard, 'show']).as('dashboard.show')
  })
  .prefix('/api/v1')
