import BaseTableUsecase from './BaseTableUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class DeleteTableUsecase extends BaseTableUsecase {
  async execute(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError('Invalid id');
    await this.tableService.deleteTable(numericId);
    return true;
  }
}

