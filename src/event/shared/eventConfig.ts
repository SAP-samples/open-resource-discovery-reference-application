/**
 * In this reference app, the event source contains a tenant ID
 * therefore, its value is system instance aware
 */
export function getEventSource(tenantId: string): string {
  return `/default/sap.foo.bar/${tenantId}`
}
