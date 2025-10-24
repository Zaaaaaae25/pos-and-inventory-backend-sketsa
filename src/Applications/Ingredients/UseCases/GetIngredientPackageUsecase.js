import BaseIngredientPackageUsecase from './BaseIngredientPackageUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class GetIngredientPackageUsecase extends BaseIngredientPackageUsecase {
  async execute(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError('Invalid id');
    const record = await this.ingredientPackageService.getIngredientPackage(numericId);
    if (!record) throw new ValidationError('IngredientPackage not found');
    return record;
  }
}

