import BaseOutletUsecase from './BaseOutletUsecase.js';
import AppError from '../../../Commons/Errors/AppError.js';
import HttpStatus from '../../../Commons/Constants/HttpStatus.js';

export default class DeleteOutletUsecase extends BaseOutletUsecase {
  async execute(id) {
    const outletId = this._normalizeId(id);
    const existing = await this.outletService.getOutlet(outletId);

    if (!existing) {
      throw new AppError('Outlet tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    await this.outletService.deleteOutlet(outletId);
  }
}
