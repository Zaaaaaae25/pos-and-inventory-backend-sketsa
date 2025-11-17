function ensureMiddlewareFunction(fn, errorMessage) {
  if (typeof fn !== 'function') {
    throw new Error(errorMessage);
  }
}

function normalizePermissionName(permissionName) {
  if (!permissionName) {
    return null;
  }

  const normalized = String(permissionName).trim().toLowerCase();
  return normalized === '' ? null : normalized;
}

export function requirePermission(permissionName, { requireAuth, authorize } = {}) {
  ensureMiddlewareFunction(requireAuth, 'PERMISSION_GUARDS.MISSING_REQUIRE_AUTH');
  ensureMiddlewareFunction(authorize, 'PERMISSION_GUARDS.MISSING_AUTHORIZE');

  const normalizedPermission = normalizePermissionName(permissionName);
  if (!normalizedPermission) {
    throw new Error('PERMISSION_GUARDS.INVALID_PERMISSION_NAME');
  }

  return [requireAuth, authorize(normalizedPermission)];
}

export function requirePermissions(permissionNames = [], { requireAuth, authorize } = {}) {
  ensureMiddlewareFunction(requireAuth, 'PERMISSION_GUARDS.MISSING_REQUIRE_AUTH');
  ensureMiddlewareFunction(authorize, 'PERMISSION_GUARDS.MISSING_AUTHORIZE');

  const inputs = Array.isArray(permissionNames) ? permissionNames : [permissionNames];
  const normalizedPermissions = inputs
    .map((permission) => normalizePermissionName(permission))
    .filter(Boolean);

  if (normalizedPermissions.length === 0) {
    throw new Error('PERMISSION_GUARDS.INVALID_PERMISSION_NAME');
  }

  return [requireAuth, authorize(normalizedPermissions)];
}
