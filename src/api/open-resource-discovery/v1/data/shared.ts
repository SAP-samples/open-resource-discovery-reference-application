import { AccessStrategy, ConsumptionBundle, Package, Product, SystemInstance } from '@sap/open-resource-discovery'
import path from 'path'
import { PUBLIC_URL } from '../../../../config.js'
import { readFileSync } from 'fs'

const packageJson = JSON.parse(readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf-8')) as {
  description: string
}

// In this file we have ORD information that are shared between multiple ORD documents

/**
 * This is just a fake namespace for this application.
 * A real namespace needs to be registered first.
 * */
export const appNamespace = 'sap.xref'

// We assume that the Vendor "SAP" is already defined and just reference it via ORD ID
const vendorSapReference = 'sap:vendor:SAP:'

export const describedSystemInstance: SystemInstance = {
  baseUrl: PUBLIC_URL,
}

export const product: Product = {
  ordId: `${appNamespace}:product:ord-reference-app:`,
  title: 'ORD Reference App',
  vendor: vendorSapReference,
  shortDescription: 'Open Resource Discovery Reference Application',
}

export const ordReferenceAppApiPackage: Package = {
  ordId: `${appNamespace}:package:ord-reference-app-apis:v1`,
  title: 'ORD Reference Application APIs',
  shortDescription: packageJson.description,
  description:
    'This reference application demonstrates how Open Resource Discovery (ORD) can be implemented, demonstrating different resources and discovery aspects',
  version: '1.0.0',
  policyLevel: 'sap:core:v1',
  partOfProducts: [product.ordId],
  vendor: vendorSapReference,
  tags: ['reference application'],
  packageLinks: [
    {
      type: 'license',
      url: 'https://github.com/SAP-samples/open-resource-discovery-reference-application/blob/main/LICENSE',
    },
  ],
  links: [
    {
      title: 'ORD Reference app description',
      url: 'https://github.com/SAP-samples/open-resource-discovery-reference-application/blob/main/README.md',
    },
    {
      title: 'ORD Reference app GitHub repository',
      url: 'https://github.com/SAP-samples/open-resource-discovery-reference-application/',
    },
  ],
  labels: {
    customLabel: ['labels are more flexible than tags as you can define your own keys'],
  },
}

export const ordReferenceAppEventsPackage: Package = {
  ...ordReferenceAppApiPackage,
  ordId: `${appNamespace}:package:ord-reference-app:v1`,
  title: 'ORD Reference Application Events',
}

export const noAuthConsumptionBundle: ConsumptionBundle = {
  ordId: `${appNamespace}:consumptionBundle:noAuth:v1`,
  version: '1.0.0',
  lastUpdate: '2023-02-03T06:44:10Z',
  title: 'Unprotected resources',
  shortDescription: 'Bundle of unprotected resources',
  description:
    'This Consumption Bundle contains all resources of the reference app which are unprotected and do not require authentication',
}

export const basicAuthConsumptionBundle: ConsumptionBundle = {
  ordId: `${appNamespace}:consumptionBundle:basicAuth:v1`,
  title: 'BasicAuth protected resources',
  version: '1.0.0',
  lastUpdate: '2023-02-03T06:44:10Z',
  shortDescription: 'Bundle of protected resources',
  description:
    'This Consumption Bundle contains all resources of the reference app which share the same BasicAuth access and identity realm',
  credentialExchangeStrategies: [
    {
      type: 'custom',
      customType: `${appNamespace}:basicAuthCredentialExchange:v1`,
      customDescription:
        'The BasicAuth credentials must be created and retrieved manually.\n Please refer to the documentation on the [ORD Reference App API access](https://github.com/SAP-samples/open-resource-discovery-reference-application#access-strategies).',
    },
  ],
}

/**
 * This is a custom access strategy that is specific to the ORD Reference application
 */
export const openAccessStrategy: AccessStrategy = {
  type: 'open',
}

/**
 * This is a custom access strategy that is specific to the ORD Reference application
 */
export const customAccessStrategyGlobalTenantId: AccessStrategy = {
  type: 'custom',
  customType: `${appNamespace}:open-global-tenant-id:v1`,
  customDescription:
    'The metadata information is openly accessible but system instance aware.\n' +
    'The tenant is selected by providing a SAP global tenant ID header.\n' +
    'To understand how to use this access strategy, please read the documentation on the ' +
    '[ORD Reference App Access Strategies](https://github.com/SAP-samples/open-resource-discovery-reference-application#access-strategies).',
}

/**
 * This is a custom access strategy that is specific to the ORD Reference application
 */
export const customAccessStrategyLocalTenantId: AccessStrategy = {
  type: 'custom',
  customType: `${appNamespace}:open-local-tenant-id:v1`,
  customDescription:
    'The metadata information is openly accessible but system instance aware.\n' +
    'The tenant is selected by providing a local tenant ID header.\n' +
    'To understand how to use this access strategy, please read the documentation on the ' +
    '[ORD Reference App Access Strategies](https://github.com/SAP-samples/open-resource-discovery-reference-application#access-strategies).',
}
