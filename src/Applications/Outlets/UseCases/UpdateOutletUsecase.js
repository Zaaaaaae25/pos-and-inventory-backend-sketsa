import BaseOutletUsecase from './BaseOutletUsecase.js';
import Outlet from '../../../Domains/Outlets/Entities/Outlet.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';
import AppError from '../../../Commons/Errors/AppError.js';
import HttpStatus from '../../../Commons/Constants/HttpStatus.js';

export default class UpdateOutletUsecase extends BaseOutletUsecase {
  async execute(id, payload = {}) {
    const outletId = this._normalizeId(id);
    const normalized = this._normalizePayload(payload);

    if (Object.keys(normalized).length === 0) {
      throw new ValidationError('At least one field must be provided');
    }

    const updated = await this.outletService.updateOutlet({
      id: outletId,
      outletData: normalized,
    });

    if (!updated) {
      throw new AppError('Outlet tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    return Outlet.fromPersistence(updated);
  }
}
