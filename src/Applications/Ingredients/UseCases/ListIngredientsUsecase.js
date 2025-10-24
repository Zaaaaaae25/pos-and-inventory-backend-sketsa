import BaseIngredientUsecase from './BaseIngredientUsecase.js';

export default class ListIngredientsUsecase extends BaseIngredientUsecase {
  async execute() {
    return this.ingredientService.listIngredients();
  }
}

