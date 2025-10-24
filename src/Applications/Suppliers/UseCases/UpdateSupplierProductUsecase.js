import BaseSupplierProductUsecase from './BaseSupplierProductUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class UpdateSupplierProductUsecase extends BaseSupplierProductUsecase {
  async execute(id, payload = {}) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError('Invalid id');
    const existing = await this.supplierProductService.getSupplierProduct(numericId);
    if (!existing) throw new ValidationError('SupplierProduct not found');

    const update = {};
    if (Object.prototype.hasOwnProperty.call(payload, 'supplierId')) {
      update.supplierId = await this._validateSupplierId(payload.supplierId);
    }
    if (Object.prototype.hasOwnProperty.call(payload, 'ingredientId')) {
      update.ingredientId = await this._validateIngredientId(payload.ingredientId);
    }
    if (Object.prototype.hasOwnProperty.call(payload, 'packageId')) {
      update.packageId = await this._validatePackageId(payload.packageId);
    }
    if (Object.prototype.hasOwnProperty.call(payload, 'qty')) {
      const qty = Number(payload.qty);
      if (!Number.isFinite(qty) || qty <= 0) throw new ValidationError('qty must be a positive number');
      update.qty = qty;
    }
    if (Object.prototype.hasOwnProperty.call(payload, 'price')) {
      const price = Number(payload.price);
      if (!Number.isFinite(price) || price < 0) throw new ValidationError('price must be a non-negative number');
      update.price = price;
    }
    if (Object.prototype.hasOwnProperty.call(payload, 'leadTime')) {
      if (payload.leadTime === null) {
        update.leadTime = null;
      } else {
        const lead = Number(payload.leadTime);
        if (!Number.isInteger(lead) || lead < 0) throw new ValidationError('leadTime must be a non-negative integer or null');
        update.leadTime = lead;
      }
    }
    if (Object.prototype.hasOwnProperty.call(payload, 'isActive')) {
      update.isActive = Boolean(payload.isActive);
    }
    if (Object.keys(update).length === 0) throw new ValidationError('No updatable fields provided');
    return this.supplierProductService.updateSupplierProduct({ id: numericId, data: update });
  }
}

