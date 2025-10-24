import BaseSupplierUsecase from './BaseSupplierUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class DeleteSupplierUsecase extends BaseSupplierUsecase {
  async execute(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError('Invalid id');
    await this.supplierService.deleteSupplier(numericId);
    return true;
  }
}

