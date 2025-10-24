import BaseUnitUsecase from './BaseUnitUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class UpdateUnitUsecase extends BaseUnitUsecase {
  async execute(id, payload = {}) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError('Invalid id');
    const existing = await this.unitService.getUnit(numericId);
    if (!existing) throw new ValidationError('Unit not found');

    const update = {};
    if (Object.prototype.hasOwnProperty.call(payload, 'name')) {
      update.name = await this._assertNameAvailable(payload.name, numericId);
    }
    if (Object.prototype.hasOwnProperty.call(payload, 'abbreviation')) {
      const abv = String(payload.abbreviation ?? '').trim().toLowerCase();
      if (!abv) throw new ValidationError('abbreviation cannot be empty');
      update.abbreviation = abv;
    }
    if (Object.keys(update).length === 0) throw new ValidationError('No updatable fields provided');
    return this.unitService.updateUnit({ id: numericId, unitData: update });
  }
}

