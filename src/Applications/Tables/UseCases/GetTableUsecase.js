import BaseTableUsecase from './BaseTableUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class GetTableUsecase extends BaseTableUsecase {
  async execute(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError('Invalid id');
    const record = await this.tableService.getTable(numericId);
    if (!record) throw new ValidationError('Table not found');
    return record;
  }
}

