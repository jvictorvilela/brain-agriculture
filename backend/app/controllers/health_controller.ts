import db from '@adonisjs/lucid/services/db'

export default class HealthController {
  async show() {
    await db.rawQuery('SELECT 1')

    return {
      status: 'ok',
      checks: {
        database: 'up',
      },
    }
  }
}
