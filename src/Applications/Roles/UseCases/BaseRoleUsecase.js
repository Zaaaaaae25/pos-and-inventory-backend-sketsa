import ValidationError from '../../../Commons/Errors/ValidationError.js';
import { SYSTEM_ROLE_NAMES, SYSTEM_ROLE_SET } from '../../../Commons/Constants/SystemRoles.js';

export default class BaseRoleUsecase {
  constructor({ roleService } = {}) {
    if (!roleService) {
      throw new Error('ROLE_USECASE.MISSING_ROLE_SERVICE');
    }

    this.roleService = roleService;
  }

  _normalizeRoleName(name) {
    return String(name ?? '').trim().toLowerCase();
  }

  async _assertNameAvailable(name, ignoreRoleId = null) {
    const normalized = this._normalizeRoleName(name);

    if (!normalized) {
      throw new ValidationError('Role name is required');
    }

    if (!SYSTEM_ROLE_SET.has(normalized)) {
      throw new ValidationError(
        `Role name must be one of: ${SYSTEM_ROLE_NAMES.join(', ')}`
      );
    }

    const existing = await this.roleService.getRoleByName(normalized);
    if (existing && existing.id !== ignoreRoleId) {
      throw new ValidationError(`Role ${normalized} already exists`);
    }

    return normalized;
  }

  async _resolvePermissions(permissionsInput) {
    if (typeof permissionsInput === 'undefined' || permissionsInput === null) {
      return { names: [], records: [] };
    }

    if (!Array.isArray(permissionsInput)) {
      throw new ValidationError('permissions must be an array of permission names');
    }

    const normalizedNames = permissionsInput
      .map((name) => this._normalizePermissionName(name))
      .filter((name) => name.length > 0);

    const uniqueNames = [...new Set(normalizedNames)];

    if (uniqueNames.length === 0 && permissionsInput.length > 0) {
      throw new ValidationError('permissions must contain valid permission names');
    }

    const records = await this.roleService.findPermissionsByNames(uniqueNames);
    const foundNames = new Set(records.map((permission) => permission.name));
    const missing = uniqueNames.filter((name) => !foundNames.has(name));

    if (missing.length > 0) {
      throw new ValidationError('Some permissions are not registered', { missing });
    }

    return { names: uniqueNames, records };
  }

  _normalizePermissionName(name) {
    return String(name ?? '').trim().toLowerCase();
  }
}
