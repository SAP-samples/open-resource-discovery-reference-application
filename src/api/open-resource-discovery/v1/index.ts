import { FastifyInstance, FastifyRequest } from 'fastify'
import fastifyETag from '@fastify/etag'
import { globalTenantIdToLocalTenantIdMapping } from '../../../data/user/tenantMapping.js'
import { getTenantIdsFromHeader } from '../../shared/validateUserAuthorization.js'
import { ordDocumentApiV1Config } from './config.js'
import { ordConfiguration } from './data/configuration.js'
import { getOrdDocument1ForTenant, ordDocument1 } from './data/document-1.js'
import { getOrdDocument2ForTenant } from './data/document-2.js'

export async function ordDocumentV1Api(fastify: FastifyInstance): Promise<void> {
  fastify.log.info(`Registering ${ordDocumentApiV1Config.apiName}...`)

  // Add support for ETag as RECOMMENDED by ORD and according to RFC2616-sec13
  // @see https://github.com/fastify/fastify-etag
  await fastify.register(fastifyETag)

  // SYSTEM INSTANCE UNAWARE ORD information

  // Serve the .well-known ORD configuration
  fastify.get('/.well-known/open-resource-discovery', async () => {
    return ordConfiguration
  })

  // Serve the unprotected, system instance unaware ORD Document #1
  fastify.get(`/${ordDocumentApiV1Config.apiEntryPoint}/documents/1`, async (req: FastifyRequest) => {
    const tenantIds = getTenantIdsFromHeader(req)

    if (tenantIds.localTenantId) {
      // This is the `sap.foo.bar:open-local-tenant-id:v1` access strategy
      return getOrdDocument1ForTenant(tenantIds.localTenantId)
    } else if (tenantIds.sapGlobalTenantId) {
      // This is the `sap.foo.bar:open-global-tenant-id:v1` access strategy
      return getOrdDocument1ForTenant(globalTenantIdToLocalTenantIdMapping[tenantIds.sapGlobalTenantId])
    } else {
      // Return the ORD Document 2 without tenant specific modifications
      // This is the `open` access strategy
      return ordDocument1
    }
  })

  // SYSTEM INSTANCE AWARE ORD information

  // Serve the unprotected, but system instance aware ORD Document #2
  // The result of this request will differ, depending on the tenant chosen
  // We'll implement this as an ORD access strategy, where the tenant ID is passed via Header
  // To show multiple options, we can offer both local tenant ID and global tenant ID for correlations
  fastify.get(`/${ordDocumentApiV1Config.apiEntryPoint}/documents/2`, async (req: FastifyRequest) => {
    const tenantIds = getTenantIdsFromHeader(req)

    if (tenantIds.localTenantId) {
      // This is the `sap.foo.bar:open-local-tenant-id:v1` access strategy
      return getOrdDocument2ForTenant(tenantIds.localTenantId)
    } else if (tenantIds.sapGlobalTenantId) {
      // This is the `sap.foo.bar:open-global-tenant-id:v1` access strategy
      return getOrdDocument2ForTenant(globalTenantIdToLocalTenantIdMapping[tenantIds.sapGlobalTenantId])
    } else {
      // Return the ORD Document 2 without tenant specific modifications
      // This is the `open` access strategy
      return getOrdDocument2ForTenant()
    }
  })
}
