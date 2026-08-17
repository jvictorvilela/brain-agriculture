import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RequestLoggerMiddleware {
  async handle({ request, response, logger }: HttpContext, next: NextFn) {
    const startedAt = performance.now()

    try {
      return await next()
    } finally {
      logger.info(
        {
          requestId: request.id(),
          method: request.method(),
          url: request.url(),
          status: response.getStatus(),
          durationMs: Number((performance.now() - startedAt).toFixed(2)),
        },
        'HTTP request completed'
      )
    }
  }
}
