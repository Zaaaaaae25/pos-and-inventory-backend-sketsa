import BaseRecipeUsecase from './BaseRecipeUsecase.js';

export default class ListRecipesUsecase extends BaseRecipeUsecase {
  async execute(){ return this.recipeService.listRecipes(); }
}

