import BaseTableUsecase from './BaseTableUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class UpdateTableUsecase extends BaseTableUsecase {
  async execute(id, payload = {}) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError('Invalid id');
    const existing = await this.tableService.getTable(numericId);
    if (!existing) throw new ValidationError('Table not found');

    const update = {};
    if (Object.prototype.hasOwnProperty.call(payload, 'placeId')) {
      update.placeId = await this._validatePlaceId(payload.placeId);
    }
    if (Object.prototype.hasOwnProperty.call(payload, 'name')) {
      const name = String(payload.name ?? '').trim();
      if (!name) throw new ValidationError('name cannot be empty');
      update.name = name;
    }
    if (Object.prototype.hasOwnProperty.call(payload, 'status')) {
      update.status = payload.status === null ? null : String(payload.status).trim() || null;
    }
    if (Object.keys(update).length === 0) throw new ValidationError('No updatable fields provided');
    return this.tableService.updateTable({ id: numericId, tableData: update });
  }
}

