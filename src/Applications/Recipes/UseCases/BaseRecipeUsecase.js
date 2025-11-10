import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BaseRecipeUsecase {
  constructor({ recipeService } = {}) { if(!recipeService) throw new Error('RECIPE_USECASE.MISSING_SERVICE'); this.recipeService = recipeService; }
  _toInt(v, name='id'){ const n=Number(v); if(!Number.isInteger(n)||n<=0) throw new ValidationError(`${name} must be a positive integer`); return n; }
}

