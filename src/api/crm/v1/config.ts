import _ from 'lodash'
import { OpenAPIV3 } from 'openapi-types'
import { LOCAL_URL, PUBLIC_URL } from '../../../config.js'
import { tenants } from '../../../data/user/tenants.js'
import {
  errorOASResponse400,
  errorOASResponse401,
  errorOASResponse403,
  errorOASResponse404,
  errorOASResponse500,
  errorSchemas,
} from '../../../shared/model/ErrorResponses.js'
import { customerSchema, customersResponseSchema } from './models/Customer.js'
import { customersResourceName, openApiPaths } from './resources/customer.js'

const apiName = 'CRM API'
const apiNamespace = 'crm'
const apiMajorVersion = 'v1'
const apiEntryPoint = `${apiNamespace}/${apiMajorVersion}`
const apiVersion = '1.0.0' // full semver API version

export const crmV1ApiConfig = {
  apiName,
  apiNamespace,
  apiMajorVersion,
  apiEntryPoint,
  apiVersion,
}

/**
 * Get the OpenAPI definition for the CRM V1 API
 *
 * This API definition is system instance aware and potentially different between tenants
 */
export function getCrmV1ApiDefinition(tenantId?: string): OpenAPIV3.Document {
  const openApiDefinition: OpenAPIV3.Document = {
    openapi: '3.0.0',
    info: {
      title: apiName,
      description: 'This is a sample CRM API, which is system instance aware.',
      version: apiVersion,
    },
    security: [
      {
        basicAuth: [], // All API resources are protected via Basic Auth
      },
    ],
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
        name: customersResourceName,
        description: 'Customers',
      },
    ],
    paths: {
      ...openApiPaths,
    },
    components: {
      securitySchemes: {
        basicAuth: {
          type: 'http',
          scheme: 'basic',
        },
      },
      schemas: {
        Customer: customerSchema,
        CustomersResponse: customersResponseSchema,
        ...errorSchemas,
      },
      responses: {
        ...errorOASResponse400,
        ...errorOASResponse401,
        ...errorOASResponse403,
        ...errorOASResponse404,
        ...errorOASResponse500,
      },
    },
  }

  // If this is called with a tenant ID, we'll apply tenant specific modifications
  // to the OpenAPI definition, e.g. field extensions
  if (tenantId) {
    const tenantConfig = tenants[tenantId]

    openApiDefinition.info.description += `\nThis OpenAPI Document is specific to tenant "${tenantId}".`

    if (tenantConfig.fieldExtensions) {
      // Customer Field Extensibility Support
      if (tenantConfig.fieldExtensions.Customer) {
        const fieldExtensions: { [fieldName: string]: OpenAPIV3.SchemaObject } = {}

        for (const fieldName in tenantConfig.fieldExtensions.Customer) {
          const fieldDescription = tenantConfig.fieldExtensions.Customer[fieldName]

          const fieldJsonSchema: OpenAPIV3.SchemaObject = {
            type: fieldDescription.type,
            description: fieldDescription.description,
          }

          fieldExtensions[fieldName] = fieldJsonSchema
        }

        const customerSchemaExtended = _.cloneDeep(customerSchema)
        customerSchemaExtended.properties = customerSchemaExtended.properties || {}
        customerSchemaExtended.properties.extension = {
          type: 'object',
          description: 'Wrapper object for customer field extensions',
          properties: fieldExtensions,
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        openApiDefinition.components!.schemas!.Customer = customerSchemaExtended
      }
    }
  }

  return openApiDefinition
}
