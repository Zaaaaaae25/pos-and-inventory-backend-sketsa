import BaseSupplierProductUsecase from './BaseSupplierProductUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class CreateSupplierProductUsecase extends BaseSupplierProductUsecase {
  async execute(payload = {}) {
    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
      throw new ValidationError('Payload must be an object');
    }
    const supplierId = await this._validateSupplierId(payload.supplierId);
    const ingredientId = await this._validateIngredientId(payload.ingredientId);
    const packageId = await this._validatePackageId(payload.packageId);
    const qty = Number(payload.qty);
    const price = Number(payload.price);
    if (!Number.isFinite(qty) || qty <= 0) throw new ValidationError('qty must be a positive number');
    if (!Number.isFinite(price) || price < 0) throw new ValidationError('price must be a non-negative number');
    const out = {
      supplierId, ingredientId, packageId, qty, price,
      leadTime: typeof payload.leadTime === 'number' ? Math.max(0, Math.floor(payload.leadTime)) : null,
      isActive: typeof payload.isActive === 'boolean' ? payload.isActive : true,
    };
    return this.supplierProductService.createSupplierProduct(out);
  }
}

