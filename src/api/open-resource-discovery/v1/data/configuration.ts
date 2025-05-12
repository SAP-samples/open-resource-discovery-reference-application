import { ORDConfiguration } from '@sap/open-resource-discovery'
import { customAccessStrategyLocalTenantId, customAccessStrategyGlobalTenantId, openAccessStrategy } from './shared.js'

export const ordConfiguration: ORDConfiguration = {
  openResourceDiscoveryV1: {
    documents: [
      // Document 1 only contains static metadata
      {
        url: '/open-resource-discovery/v1/documents/1',
        accessStrategies: [openAccessStrategy],
        perspective: 'system-version',
      },
      // The system-instance perspective is identical to the system-version perspective
      // So we just link to the same document again
      {
        url: '/open-resource-discovery/v1/documents/1',
        accessStrategies: [customAccessStrategyGlobalTenantId, customAccessStrategyLocalTenantId],
        perspective: 'system-instance',
      },
      // Document 2 contains dynamic metadata, but only if accessed with a system / tenant header and the correct access strategy
      {
        url: '/open-resource-discovery/v1/documents/2',
        accessStrategies: [openAccessStrategy],
        perspective: 'system-version',
      },
      {
        url: '/open-resource-discovery/v1/documents/2',
        accessStrategies: [customAccessStrategyGlobalTenantId, customAccessStrategyLocalTenantId],
        perspective: 'system-instance',
      },
    ],
  },
}
