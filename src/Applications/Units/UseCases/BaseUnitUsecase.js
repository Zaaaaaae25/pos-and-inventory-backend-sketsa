import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BaseUnitUsecase {
  constructor({ unitService } = {}) {
    if (!unitService) throw new Error('UNIT_USECASE.MISSING_SERVICE');
    this.unitService = unitService;
  }

  _normalize(text) { return String(text ?? '').trim().toLowerCase(); }

  async _assertNameAvailable(name, ignoreId = null) {
    const normalized = this._normalize(name);
    if (!normalized) throw new ValidationError('Unit name is required');
    const existing = await this.unitService.getUnitByName(normalized);
    if (existing && existing.id !== ignoreId) {
      throw new ValidationError(`Unit ${normalized} already exists`);
    }
    return normalized;
  }
}

