import BaseIngredientUsecase from './BaseIngredientUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class DeleteIngredientUsecase extends BaseIngredientUsecase {
  async execute(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError('Invalid id');
    await this.ingredientService.deleteIngredient(numericId);
    return true;
  }
}

