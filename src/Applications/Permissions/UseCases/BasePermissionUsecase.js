import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BasePermissionUsecase {
  constructor({ permissionService } = {}) {
    if (!permissionService) {
      throw new Error('PERMISSION_USECASE.MISSING_SERVICE');
    }
    this.permissionService = permissionService;
  }

  _normalizeName(name) {
    return String(name ?? '').trim().toLowerCase();
  }

  async _assertNameAvailable(name, ignoreId = null) {
    const normalized = this._normalizeName(name);
    if (!normalized) {
      throw new ValidationError('Permission name is required');
    }
    const existing = await this.permissionService.getPermissionByName(normalized);
    if (existing && existing.id !== ignoreId) {
      throw new ValidationError(`Permission ${normalized} already exists`);
    }
    return normalized;
  }
}

