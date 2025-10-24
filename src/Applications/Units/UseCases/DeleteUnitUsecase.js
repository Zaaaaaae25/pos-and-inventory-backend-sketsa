import BaseUnitUsecase from './BaseUnitUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class DeleteUnitUsecase extends BaseUnitUsecase {
  async execute(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError('Invalid id');
    await this.unitService.deleteUnit(numericId);
    return true;
  }
}

