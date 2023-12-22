import { FastifyRequest } from 'fastify'
import _ from 'lodash'
import { TenantConfiguration, tenants } from '../../data/user/tenants.js'
import { apiUsersAndPasswords } from '../../data/user/users.js'
import { UnauthorizedError } from '../../error/UnauthorizedError.js'

export interface UserInfo {
  userName: string
  tenantId: string
  tenantConfiguration: TenantConfiguration
}

export const basicAuthConfig = { validate: validateUserAuthorization, authenticate: true }

/**
 * Validates a request for a valid BasicAuth login
 *
 * When successful it will annotate the request object with a user object
 * containing the user context information
 *
 * @throws UnauthorizedError
 */
export async function validateUserAuthorization(
  username: string,
  password: string,
  req: FastifyRequest,
): Promise<void> {
  if (apiUsersAndPasswords[username] && apiUsersAndPasswords[username].password === password) {
    const tenantId = apiUsersAndPasswords[username].tenantId
    // Add user info to the request that we've validated
    req.user = {
      userName: username,
      tenantId,
      tenantConfiguration: tenants[tenantId],
    }
    req.log.info(`User "${username}" of tenant "${tenantId}" authenticated successfully.`)
    return
  } else {
    throw new UnauthorizedError(`Unknown username "${username}" and password combination`)
  }
}

export function getTenantIdsFromHeader(req: FastifyRequest): {
  localTenantId: string | undefined
  sapGlobalTenantId: string | undefined
} {
  const localTenantId = _.isArray(req.headers['sap-local-tenant-id'])
    ? req.headers['sap-local-tenant-id'].join()
    : req.headers['sap-local-tenant-id']
  const sapGlobalTenantId = _.isArray(req.headers['sap-global-tenant-id'])
    ? req.headers['sap-global-tenant-id'].join()
    : req.headers['sap-global-tenant-id']

  return {
    localTenantId,
    sapGlobalTenantId,
  }
}
