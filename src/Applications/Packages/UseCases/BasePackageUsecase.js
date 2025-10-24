import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BasePackageUsecase {
  constructor({ packageService } = {}) {
    if (!packageService) throw new Error('PACKAGE_USECASE.MISSING_SERVICE');
    this.packageService = packageService;
  }

  _normalize(name) { return String(name ?? '').trim().toLowerCase(); }

  async _assertNameAvailable(name, ignoreId = null) {
    const normalized = this._normalize(name);
    if (!normalized) throw new ValidationError('Package name is required');
    const existing = await this.packageService.getPackageByName(normalized);
    if (existing && existing.id !== ignoreId) throw new ValidationError(`Package ${normalized} already exists`);
    return normalized;
  }
}

