export const SYSTEM_ROLE_NAMES = Object.freeze([
  'brand_owner',
  'location_owner',
  'admin',
  'store_manager',
  'cashier',
  'chef',
  'purchaising',
  'waiters',
]);

export const SYSTEM_ROLE_SET = new Set(SYSTEM_ROLE_NAMES);

export function assertValidSystemRole(name) {
  const normalized = String(name ?? '').trim().toLowerCase();
  if (!SYSTEM_ROLE_SET.has(normalized)) {
    throw new Error(
      `Invalid system role: ${normalized || '<empty>'}. Expected one of: ${SYSTEM_ROLE_NAMES.join(', ')}`
    );
  }

  return normalized;
}

export function isValidSystemRole(name) {
  const normalized = String(name ?? '').trim().toLowerCase();
  return SYSTEM_ROLE_SET.has(normalized);
}
