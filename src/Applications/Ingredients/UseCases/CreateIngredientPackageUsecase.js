import BaseIngredientPackageUsecase from './BaseIngredientPackageUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class CreateIngredientPackageUsecase extends BaseIngredientPackageUsecase {
  async execute(payload = {}) {
    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
      throw new ValidationError('Payload must be an object');
    }
    const ingredientId = await this._validateIngredientId(payload.ingredientId);
    const packageId = await this._validatePackageId(payload.packageId);
    const qty = Number(payload.qty);
    if (!Number.isFinite(qty) || qty <= 0) throw new ValidationError('qty must be a positive number');
    return this.ingredientPackageService.createIngredientPackage({ ingredientId, packageId, qty });
  }
}

