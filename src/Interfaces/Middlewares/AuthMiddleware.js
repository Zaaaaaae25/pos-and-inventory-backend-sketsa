import AppError from '../../Commons/Errors/AppError.js';
import HttpStatus from '../../Commons/Constants/HttpStatus.js';
import { expandPermissionsWithAliases } from '../../Commons/Constants/PermissionMatrix.js';
import { verifyToken } from '../../Commons/Utils/JwtHelper.js';
import User from '../../Domains/Users/Entities/User.js';
import { setRequestContextUser } from '../../Infrastructures/Context/RequestContext.js';

function extractBearerToken(authorizationHeader) {
  if (!authorizationHeader) {
    return null;
  }

  const [scheme, token] = authorizationHeader.split(' ');

  if (!scheme || scheme.toLowerCase() !== 'bearer' || !token) {
    return null;
  }

  return token;
}

function normalizePermissionName(permissionName) {
  if (!permissionName) {
    return null;
  }

  const normalized = String(permissionName).trim().toLowerCase();
  return normalized === '' ? null : normalized;
}

export function optionalAuth(req, res, next) {
  req.user = null;

  const authorization = req.get('authorization');
  if (!authorization) {
    next();
    return;
  }

  const token = extractBearerToken(authorization);
  if (!token) {
    next(new AppError('Invalid authorization header', HttpStatus.UNAUTHORIZED));
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError('Invalid or expired token', HttpStatus.UNAUTHORIZED));
  }
}

export function createRequireAuthMiddleware({ userService, tokenVerifier = verifyToken } = {}) {
  if (!userService) {
    throw new Error('AUTH_MIDDLEWARE.REQUIRE_AUTH_MISSING_USER_SERVICE');
  }

  if (typeof tokenVerifier !== 'function') {
    throw new Error('AUTH_MIDDLEWARE.INVALID_TOKEN_VERIFIER');
  }

  return async function requireAuth(req, res, next) {
    const authorization = req.get('authorization');
    const token = extractBearerToken(authorization);

    if (!token) {
      next(new AppError('Missing or invalid authorization header', HttpStatus.UNAUTHORIZED));
      return;
    }

    let decoded;

    try {
      decoded = tokenVerifier(token);
    } catch (error) {
      next(new AppError('Invalid or expired token', HttpStatus.UNAUTHORIZED));
      return;
    }

    const subject = decoded?.sub;
    const numericUserId =
      typeof subject === 'number'
        ? subject
        : typeof subject === 'string'
        ? Number.parseInt(subject, 10)
        : NaN;

    if (!Number.isInteger(numericUserId) || numericUserId <= 0) {
      next(new AppError('Invalid or expired token', HttpStatus.UNAUTHORIZED));
      return;
    }

    try {
      const record = await userService.getUser(numericUserId);

      if (!record) {
        next(new AppError('User not found', HttpStatus.UNAUTHORIZED));
        return;
      }

      const domainUser = User.fromPersistence(record);

      if (!domainUser || !domainUser.id) {
        next(new AppError('User not found', HttpStatus.UNAUTHORIZED));
        return;
      }

      if (domainUser.status && domainUser.status !== 'active') {
        next(new AppError('User account is not active', HttpStatus.FORBIDDEN));
        return;
      }

      const rolePermissions = Array.isArray(domainUser.role?.permissions)
        ? domainUser.role.permissions
            .map((permission) => normalizePermissionName(permission))
            .filter(Boolean)
        : [];

      req.user = {
        id: domainUser.id,
        name: domainUser.name,
        email: domainUser.email,
        status: domainUser.status,
        authenticationMethod: domainUser.authenticationMethod,
        placeId: domainUser.placeId,
        role: domainUser.role
          ? {
              id: domainUser.role.id,
              name: domainUser.role.name,
              description: domainUser.role.description ?? null,
              permissions: rolePermissions,
            }
          : null,
        permissions: rolePermissions,
      };

      req.auth = {
        token,
        payload: decoded,
      };

      setRequestContextUser(req.user);

      next();
    } catch (error) {
      next(error);
    }
  };
}

export function createAuthorizeMiddleware() {
  return (...permissionArgs) => {
    const flattened = permissionArgs.length === 1 && Array.isArray(permissionArgs[0])
      ? permissionArgs[0]
      : permissionArgs;

    const requiredPermissions = flattened
      .map((permission) => normalizePermissionName(permission))
      .filter(Boolean);

    return (req, res, next) => {
      if (!req.user) {
        next(new AppError('Authentication required', HttpStatus.UNAUTHORIZED));
        return;
      }

      const permissionSources = [];

      if (Array.isArray(req.user.permissions)) {
        permissionSources.push(...req.user.permissions);
      }

      if (Array.isArray(req.user.role?.permissions)) {
        permissionSources.push(...req.user.role.permissions);
      }

      const rolePermissions = permissionSources
        .map((permission) => normalizePermissionName(permission))
        .filter(Boolean);

      if (requiredPermissions.length === 0) {
        if (rolePermissions.length === 0) {
          next(new AppError('Access denied', HttpStatus.FORBIDDEN));
          return;
        }

        next();
        return;
      }

      const permissionSet = expandPermissionsWithAliases(rolePermissions);
      const hasAccess = requiredPermissions.some((permission) =>
        permissionSet.has(permission)
      );

      if (!hasAccess) {
        next(new AppError('Access denied', HttpStatus.FORBIDDEN));
        return;
      }

      next();
    };
  };
}
