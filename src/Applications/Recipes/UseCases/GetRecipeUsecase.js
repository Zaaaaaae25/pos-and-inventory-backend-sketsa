import BaseRecipeUsecase from './BaseRecipeUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class GetRecipeUsecase extends BaseRecipeUsecase {
  async execute(id){ const intId=this._toInt(id); const rec=await this.recipeService.getRecipe(intId); if(!rec) throw new ValidationError('Recipe not found'); return rec; }
}

