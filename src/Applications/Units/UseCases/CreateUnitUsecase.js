import BaseUnitUsecase from './BaseUnitUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class CreateUnitUsecase extends BaseUnitUsecase {
  async execute(payload = {}) {
    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
      throw new ValidationError('Payload must be an object');
    }
    const name = await this._assertNameAvailable(payload.name);
    const abbreviation = String(payload.abbreviation ?? '').trim().toLowerCase();
    if (!abbreviation) throw new ValidationError('abbreviation is required');
    return this.unitService.createUnit({ name, abbreviation });
  }
}

