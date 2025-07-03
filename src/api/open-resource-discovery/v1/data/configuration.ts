import { ORDConfiguration } from '@open-resource-discovery/specification'
import { customAccessStrategyLocalTenantId, customAccessStrategyGlobalTenantId, openAccessStrategy } from './shared.js'

export const ordConfiguration: ORDConfiguration = {
  openResourceDiscoveryV1: {
    documents: [
      // Serve static metadata with open access strategy, ignore tenant headers
      {
        url: '/open-resource-discovery/v1/documents/system-version',
        accessStrategies: [openAccessStrategy],
        perspective: 'system-version',
      },
      // Serve dynamic metadata, requires system / tenant headers and the correct access strategy
      {
        url: '/open-resource-discovery/v1/documents/system-instance',
        accessStrategies: [customAccessStrategyGlobalTenantId, customAccessStrategyLocalTenantId],
        perspective: 'system-instance',
      },
    ],
  },
}
