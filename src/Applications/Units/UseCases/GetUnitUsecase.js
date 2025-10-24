import BaseUnitUsecase from './BaseUnitUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class GetUnitUsecase extends BaseUnitUsecase {
  async execute(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError('Invalid id');
    const record = await this.unitService.getUnit(numericId);
    if (!record) throw new ValidationError('Unit not found');
    return record;
  }
}

