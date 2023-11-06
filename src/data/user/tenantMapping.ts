export interface GlobalToLocalTenantIdMapping {
  [globalTenantId: string]: string
}

/**
 * This is a mapping from global tenant IDs to local tenant IDs of the reference application
 *
 * As of now, we assume that the CLD Tenant ID will be the global tenant id
 * @see https://wiki.one.int.sap/wiki/display/CLMAM/CLD+Tenant+ID
 */
export const globalTenantIdToLocalTenantIdMapping: GlobalToLocalTenantIdMapping = {
  '740000101': 'T1',
  '740000102': 'T2',
}
