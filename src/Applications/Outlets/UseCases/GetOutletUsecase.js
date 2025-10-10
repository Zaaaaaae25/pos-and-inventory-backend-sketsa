import BaseOutletUsecase from './BaseOutletUsecase.js';
import Outlet from '../../../Domains/Outlets/Entities/Outlet.js';
import AppError from '../../../Commons/Errors/AppError.js';
import HttpStatus from '../../../Commons/Constants/HttpStatus.js';

export default class GetOutletUsecase extends BaseOutletUsecase {
  async execute(id) {
    const outletId = this._normalizeId(id);
    const record = await this.outletService.getOutlet(outletId);

    if (!record) {
      throw new AppError('Outlet tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    return Outlet.fromPersistence(record);
  }
}
