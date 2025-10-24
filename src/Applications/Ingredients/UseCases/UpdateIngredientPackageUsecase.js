import BaseIngredientPackageUsecase from './BaseIngredientPackageUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class UpdateIngredientPackageUsecase extends BaseIngredientPackageUsecase {
  async execute(id, payload = {}) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError('Invalid id');
    const existing = await this.ingredientPackageService.getIngredientPackage(numericId);
    if (!existing) throw new ValidationError('IngredientPackage not found');

    const update = {};
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
    if (Object.keys(update).length === 0) throw new ValidationError('No updatable fields provided');
    return this.ingredientPackageService.updateIngredientPackage({ id: numericId, data: update });
  }
}

