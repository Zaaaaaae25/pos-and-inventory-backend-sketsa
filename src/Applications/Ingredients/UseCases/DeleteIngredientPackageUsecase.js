import BaseIngredientPackageUsecase from './BaseIngredientPackageUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class DeleteIngredientPackageUsecase extends BaseIngredientPackageUsecase {
  async execute(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError('Invalid id');
    await this.ingredientPackageService.deleteIngredientPackage(numericId);
    return true;
  }
}

