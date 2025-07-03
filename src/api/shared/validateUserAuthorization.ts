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
export function validateUserAuthorization(username: string, password: string, req: FastifyRequest): void {
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
  let localTenantId = _.isArray(req.headers['local-tenant-id'])
    ? req.headers['local-tenant-id'].join()
    : req.headers['local-tenant-id']
  let sapGlobalTenantId = _.isArray(req.headers['global-tenant-id'])
    ? req.headers['global-tenant-id'].join()
    : req.headers['global-tenant-id']

  if (req.query && (req.query as Record<string, string>)['local-tenant-id']) {
    localTenantId = (req.query as Record<string, string>)['local-tenant-id']
  }
  if (req.query && (req.query as Record<string, string>)['global-tenant-id']) {
    sapGlobalTenantId = (req.query as Record<string, string>)['global-tenant-id']
  }

  return {
    localTenantId,
    sapGlobalTenantId,
  }
}
