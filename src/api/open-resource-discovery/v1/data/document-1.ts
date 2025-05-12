import _ from 'lodash'
import { APIResource, EntityType, EventResource, ORDDocument } from '@sap/open-resource-discovery'
import { odmFinanceCostObjectEventConfig } from '../../../../event/odm-finance-costobject/v1/config.js'

import { astronomyV1ApiConfig } from '../../../astronomy/v1/config.js'
import {
  describedSystemInstance,
  noAuthConsumptionBundle,
  openAccessStrategy,
  ordReferenceAppApiPackage,
  ordReferenceAppEventsPackage,
  product,
  appNamespace,
  customAccessStrategyGlobalTenantId,
  customAccessStrategyLocalTenantId,
} from './shared.js'

export const constellationEntityType: EntityType = {
  ordId: `${appNamespace}:entityType:Constellation:v1`,
  localId: 'Constellation',
  version: '1.0.0',
  title: 'Constellation',
  level: 'aggregate',
  description: 'Description of the local Constellation Model',
  visibility: 'public',
  releaseStatus: 'active',
  partOfPackage: ordReferenceAppApiPackage.ordId,
}

const astronomyV1ApiResource: APIResource = {
  ordId: `${appNamespace}:apiResource:${astronomyV1ApiConfig.apiNamespace}:${astronomyV1ApiConfig.apiMajorVersion}`,
  title: astronomyV1ApiConfig.apiName,
  shortDescription: 'The Astronomy API allows you to discover...',
  description: 'A longer description of this API with **markdown** \n## headers\n etc...',
  version: astronomyV1ApiConfig.apiVersion,
  lastUpdate: '2023-02-03T06:44:10Z',
  visibility: 'public',
  releaseStatus: 'active',
  partOfPackage: ordReferenceAppApiPackage.ordId,
  partOfConsumptionBundles: [{ ordId: noAuthConsumptionBundle.ordId }],
  apiProtocol: 'rest',
  apiResourceLinks: [
    {
      type: 'api-documentation',
      url: '/swagger-ui.html?urls.primaryName=Astronomy%20V1%20API',
    },
  ],
  resourceDefinitions: [
    {
      type: 'openapi-v3',
      mediaType: 'application/json',
      url: '/astronomy/v1/openapi/oas3.json',
      accessStrategies: [openAccessStrategy],
    },
  ],
  entryPoints: [`/${astronomyV1ApiConfig.apiEntryPoint}`],
  extensible: {
    supported: 'no',
  },
  entityTypeMappings: [
    {
      entityTypeTargets: [
        {
          ordId: `${appNamespace}:entityType:Constellation:v1`,
        },
      ],
    },
  ],
}

const odmFinanceCostObjectV1EventResource: EventResource = {
  ordId: `${appNamespace}:eventResource:${odmFinanceCostObjectEventConfig.eventResourceName}:${odmFinanceCostObjectEventConfig.eventResourceMajorVersion}`,
  title: odmFinanceCostObjectEventConfig.eventResourceTitle,
  shortDescription: 'Example ODM finance cost center event',
  description: odmFinanceCostObjectEventConfig.eventResourceDescription,
  version: odmFinanceCostObjectEventConfig.eventResourceVersion,
  lastUpdate: '2023-02-03T06:44:10Z',
  releaseStatus: 'beta',
  partOfPackage: ordReferenceAppEventsPackage.ordId,
  visibility: 'public',
  resourceDefinitions: [
    {
      type: 'asyncapi-v2',
      mediaType: 'application/json',
      url: '/sap-events/v1/odm-finance-costobject.asyncapi2.json',
      accessStrategies: [customAccessStrategyGlobalTenantId, customAccessStrategyLocalTenantId, openAccessStrategy],
    },
  ],
  extensible: {
    supported: 'no',
  },
  entityTypeMappings: [
    {
      entityTypeTargets: [
        {
          ordId: 'sap.odm.finance:entityType:CostObject:v1',
        },
      ],
    },
  ],
}

/**
 * This is the complete ORD document that will be served through the ORD Document API
 */
export const ordDocument1: ORDDocument = {
  openResourceDiscovery: '1.10',
  policyLevels: ['sap:core:v1'],
  perspective: 'system-version',
  description: 'This is an example ORD document which is unprotected and openly accessible.',
  describedSystemInstance: describedSystemInstance,
  products: [product],
  packages: [ordReferenceAppApiPackage, ordReferenceAppEventsPackage],
  consumptionBundles: [noAuthConsumptionBundle],
  apiResources: [astronomyV1ApiResource],
  eventResources: [odmFinanceCostObjectV1EventResource],
  entityTypes: [constellationEntityType],
  tombstones: [
    {
      ordId: `${appNamespace}:apiResource:${astronomyV1ApiConfig.apiNamespace}:v0`,
      removalDate: '2021-03-12T06:44:10Z',
    },
  ],
}

/**
 * As we want to demonstrate a tenant specific ORD Document,
 * We'll return a different one per tenant, respecting some tenant configurations
 */
export function getOrdDocument1ForTenant(localTenantId?: string): ORDDocument {
  const tenantSpecificOrdDocument1 = _.cloneDeep(ordDocument1)

  tenantSpecificOrdDocument1.perspective = 'system-instance'

  // If we don't provide a local tenant Id, we'll return the ORD document without tenant specific modifications
  // An alternative to this could be to throw an invalid user input error and require to provide a tenant
  if (!localTenantId) {
    return tenantSpecificOrdDocument1
  }
  tenantSpecificOrdDocument1.description += `\nThis ORD Document is specific to tenant "${localTenantId}"`

  return tenantSpecificOrdDocument1
}
