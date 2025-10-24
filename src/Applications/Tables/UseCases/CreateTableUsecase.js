import BaseTableUsecase from './BaseTableUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class CreateTableUsecase extends BaseTableUsecase {
  async execute(payload = {}) {
    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
      throw new ValidationError('Payload must be an object');
    }
    const placeId = await this._validatePlaceId(payload.placeId);
    const name = String(payload.name ?? '').trim();
    if (!name) throw new ValidationError('name is required');
    let status = null;
    if (typeof payload.status !== 'undefined') {
      status = payload.status === null ? null : String(payload.status).trim() || null;
    }
    return this.tableService.createTable({ placeId, name, status });
  }
}

