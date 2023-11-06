import { FastifyInstance } from 'fastify'
import { OpenAPIV3 } from 'openapi-types'
import { getAstronomyV1ApiDefinition } from '../config.js'

export const openApiResourceName = 'openapi'

/**
 * As part of the Astronomy V1 API we also return the OpenAPI 3 definition
 * as a self description of the service and to expose the API contract
 *
 * This will later be referenced through ORD.
 */
export async function openApiResource(fastify: FastifyInstance): Promise<void> {
  fastify.get('/oas3.json', {}, getOpenApiDefinitionHandler)
}

async function getOpenApiDefinitionHandler(): Promise<OpenAPIV3.Document> {
  return getAstronomyV1ApiDefinition()
}
