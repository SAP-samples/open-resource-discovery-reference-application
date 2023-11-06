import { APIResource, ORDDocument } from '@sap/open-resource-discovery'
import _ from 'lodash'
import { tenants } from '../../../../data/user/tenants.js'
import { crmV1ApiConfig } from '../../../crm/v1/config.js'
import {
  appNamespace,
  basicAuthConsumptionBundle,
  customAccessStrategyGlobalTenantId,
  customAccessStrategyLocalTenantId,
  describedSystemInstance,
  openAccessStrategy,
  ordReferenceAppApiPackage,
} from './shared.js'

const crmV1ApiResource: APIResource = {
  ordId: `${appNamespace}:apiResource:${crmV1ApiConfig.apiNamespace}:${crmV1ApiConfig.apiMajorVersion}`,
  title: crmV1ApiConfig.apiName,
  shortDescription: 'The CRM API allows you to manage customers...',
  description: 'This API is **protected** via BasicAuth and is tenant aware',
  version: crmV1ApiConfig.apiVersion,
  lastUpdate: new Date().toISOString(),
  visibility: 'internal',
  releaseStatus: 'beta',
  systemInstanceAware: true,
  partOfPackage: ordReferenceAppApiPackage.ordId,
  partOfConsumptionBundles: [
    {
      ordId: basicAuthConsumptionBundle.ordId,
    },
  ],
  apiProtocol: 'rest',
  apiResourceLinks: [
    {
      type: 'api-documentation',
      url: '/swagger-ui.html?urls.primaryName=CRM%20V1%20API',
    },
  ],
  resourceDefinitions: [
    {
      type: 'openapi-v3',
      mediaType: 'application/json',
      url: '/crm/v1/openapi/oas3.json',
      accessStrategies: [customAccessStrategyGlobalTenantId, customAccessStrategyLocalTenantId, openAccessStrategy],
    },
  ],
  entryPoints: [`/${crmV1ApiConfig.apiEntryPoint}`],
  extensible: {
    supported: 'manual',
    description: 'This API can be extended with custom fields.',
  },
  changelogEntries: [
    {
      version: '0.3.0',
      date: '2021-05-25',
      releaseStatus: 'beta',
    },
  ],
}

/**
 * This is the complete ORD document that will be served through the ORD Document API
 */
const ordDocument2: ORDDocument = {
  openResourceDiscovery: '1.6',
  policyLevel: 'sap:core:v1',
  description: 'This is an example ORD document which is protected and system instance aware (as are its resources).',
  describedSystemInstance: describedSystemInstance,
  apiResources: [crmV1ApiResource],
  eventResources: [],
  consumptionBundles: [basicAuthConsumptionBundle],
}

/**
 * As we want to demonstrate a tenant specific ORD Document,
 * We'll return a different one per tenant, respecting some tenant configurations
 */
export function getOrdDocument2ForTenant(localTenantId?: string): ORDDocument {
  const tenantSpecificOrdDocument1 = _.cloneDeep(ordDocument2)

  // If we don't provide a local tenant Id, we'll return the ORD document without tenant specific modifications
  // An alternative to this could be to throw an invalid user input error and require to provide a tenant
  if (!localTenantId) {
    return tenantSpecificOrdDocument1
  }
  tenantSpecificOrdDocument1.description += `\nThis ORD Document is specific to tenant "${localTenantId}"`

  const tenantConfig = tenants[localTenantId]
  if (!tenantConfig.enabledApis.includes('crm')) {
    // Do not describe the CRM V1 API if the tenant does not have it available
    _.remove(tenantSpecificOrdDocument1.apiResources || [], {
      ordId: crmV1ApiResource.ordId,
    })
  }

  return tenantSpecificOrdDocument1
}
