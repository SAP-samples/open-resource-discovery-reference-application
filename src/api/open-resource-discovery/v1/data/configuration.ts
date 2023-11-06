import { ORDConfiguration } from '@sap/open-resource-discovery'
import { customAccessStrategyLocalTenantId, customAccessStrategyGlobalTenantId, openAccessStrategy } from './shared.js'

export const ordConfiguration: ORDConfiguration = {
  openResourceDiscoveryV1: {
    documents: [
      {
        url: '/open-resource-discovery/v1/documents/1',
        accessStrategies: [openAccessStrategy],
      },
      {
        url: '/open-resource-discovery/v1/documents/2',
        accessStrategies: [customAccessStrategyGlobalTenantId, customAccessStrategyLocalTenantId, openAccessStrategy],
        systemInstanceAware: true,
      },
    ],
  },
}
