import { fastify } from 'fastify'
import { fastifyStatic } from '@fastify/static'
import * as path from 'path'
import { astronomyV1Api } from './api/astronomy/v1/index.js'
import { astronomyV1ApiConfig } from './api/astronomy/v1/config.js'
import { crmV1Api } from './api/crm/v1/index.js'
import { crmV1ApiConfig } from './api/crm/v1/config.js'
import { healthCheckV1Api } from './api/health/v1/index.js'
import { healthCheckV1Config } from './api/health/v1/config.js'
import { healthCheckV2Api } from './api/health/v2/index.js'
import { healthCheckV2Config } from './api/health/v2/config.js'
import { ordDocumentV1Api } from './api/open-resource-discovery/v1/index.js'
import { PORT } from './config.js'
import { errorHandler } from './error/errorHandler.js'
import { sapEventCatalogDefinition } from './event/odm-finance-costobject/v1/eventCatalogDefinition.js'
import { logger } from './shared/logger.js'

const server = fastify({
  logger,
  ignoreTrailingSlash: true,
  exposeHeadRoutes: true,
})

// eslint-disable-next-line no-console
initServer().catch(console.error)

async function initServer(): Promise<void> {
  // Setup generic error handling
  server.setErrorHandler(errorHandler)

  // Register the APIs of the backend
  await Promise.all([
    server.register(healthCheckV1Api, { prefix: `/${healthCheckV1Config.apiEntryPoint}` }),
    server.register(healthCheckV2Api, { prefix: `/${healthCheckV2Config.apiEntryPoint}` }),
    server.register(astronomyV1Api, { prefix: `/${astronomyV1ApiConfig.apiEntryPoint}` }),
    server.register(crmV1Api, { prefix: `/${crmV1ApiConfig.apiEntryPoint}` }),
    server.register(sapEventCatalogDefinition, { prefix: '/sap-events/v1' }),
    server.register(ordDocumentV1Api, {}),
  ])

  // Static file serving, to serve some HTML documentation for the reference app
  await server.register(fastifyStatic, {
    prefix: '/',
    root: path.resolve(process.cwd(), './static'),
  })

  await server.listen({
    port: PORT,
    host: '0.0.0.0',
  })

  server.log.info(`Server listening at http://localhost:${PORT}`)
}

function closeGracefully(signal: string): void {
  // eslint-disable-next-line no-console
  console.log(`Received signal to terminate: ${signal}`)
  process.exit()
}
process.on('SIGINT', closeGracefully)
process.on('SIGTERM', closeGracefully)
