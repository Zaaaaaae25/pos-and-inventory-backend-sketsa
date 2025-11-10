import RecipeRepository from '../../../Domains/Recipes/Repositories/RecipeRepository.js';

export default class RecipeService {
  constructor({ recipeRepository } = {}) {
    if (!recipeRepository) throw new Error('RECIPE_SERVICE.MISSING_REPOSITORY');
    if (!(recipeRepository instanceof RecipeRepository)) {
      const methods=['findAll','findById','createRecipe','updateRecipe','deleteRecipe'];
      const missing=methods.find((m)=>typeof recipeRepository[m]!== 'function');
      if (missing) throw new Error(`RECIPE_SERVICE.INVALID_REPOSITORY: missing ${missing}`);
    }
    this._repo = recipeRepository;
  }
  listRecipes(){ return this._repo.findAll(); }
  getRecipe(id){ return this._repo.findById(id); }
  createRecipe(data){ return this._repo.createRecipe(data); }
  updateRecipe(payload){ return this._repo.updateRecipe(payload); }
  deleteRecipe(id){ return this._repo.deleteRecipe(id); }
}

