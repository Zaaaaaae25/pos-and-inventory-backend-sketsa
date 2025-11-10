import BaseRecipeUsecase from './BaseRecipeUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class DeleteRecipeUsecase extends BaseRecipeUsecase {
  async execute(id){ const intId=this._toInt(id); const ok=await this.recipeService.deleteRecipe(intId); if(!ok) throw new ValidationError('Recipe not found'); return true; }
}

