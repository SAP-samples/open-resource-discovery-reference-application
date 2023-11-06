import { OpenAPIV3 } from 'openapi-types'
import { LOCAL_URL, PUBLIC_URL } from '../../../config.js'
import {
  errorOASResponse400,
  errorOASResponse404,
  errorOASResponse500,
  errorSchemas,
} from '../../../shared/model/ErrorResponses.js'
import { constellationSchema, constellationsResponseSchema } from './models/Constellation.js'
import { openApiPaths } from './resources/constellations.js'

const apiName = 'Astronomy API'
const apiNamespace = 'astronomy'
const apiMajorVersion = 'v1'
const apiEntryPoint = `${apiNamespace}/${apiMajorVersion}`
const apiVersion = '1.0.3' // full semver API version

export const astronomyV1ApiConfig = {
  apiName,
  apiNamespace,
  apiMajorVersion,
  apiEntryPoint,
  apiVersion,
}

export function getAstronomyV1ApiDefinition(): OpenAPIV3.Document {
  return {
    openapi: '3.0.0',
    info: {
      title: apiName,
      description: 'This is just a sample API',
      version: apiVersion,
    },
    servers: [
      {
        url: `${PUBLIC_URL}/${apiEntryPoint}`,
      },
      {
        url: `${LOCAL_URL}/${apiEntryPoint}`,
      },
    ],
    tags: [
      {
        name: 'constellations',
        description: 'Constellations',
      },
    ],
    paths: {
      ...openApiPaths,
    },
    components: {
      schemas: {
        Constellation: constellationSchema,
        ConstellationsResponse: constellationsResponseSchema,
        ...errorSchemas,
      },
      responses: {
        ...errorOASResponse400,
        ...errorOASResponse404,
        ...errorOASResponse500,
      },
    },
  }
}
