import BaseIngredientUsecase from './BaseIngredientUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class GetIngredientUsecase extends BaseIngredientUsecase {
  async execute(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) throw new ValidationError('Invalid id');
    const record = await this.ingredientService.getIngredient(numericId);
    if (!record) throw new ValidationError('Ingredient not found');
    return record;
  }
}

