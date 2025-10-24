import BaseSupplierUsecase from './BaseSupplierUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class GetSupplierUsecase extends BaseSupplierUsecase {
  async execute(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError('Invalid id');
    const record = await this.supplierService.getSupplier(numericId);
    if (!record) throw new ValidationError('Supplier not found');
    return record;
  }
}

