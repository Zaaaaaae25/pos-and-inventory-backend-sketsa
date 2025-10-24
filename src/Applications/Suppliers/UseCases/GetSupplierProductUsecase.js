import BaseSupplierProductUsecase from './BaseSupplierProductUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class GetSupplierProductUsecase extends BaseSupplierProductUsecase {
  async execute(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError('Invalid id');
    const record = await this.supplierProductService.getSupplierProduct(numericId);
    if (!record) throw new ValidationError('SupplierProduct not found');
    return record;
  }
}

