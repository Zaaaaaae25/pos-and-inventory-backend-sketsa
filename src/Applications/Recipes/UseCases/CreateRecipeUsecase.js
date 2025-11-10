import BaseRecipeUsecase from './BaseRecipeUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class CreateRecipeUsecase extends BaseRecipeUsecase {
  async execute(payload={}){
    const menuId=this._toInt(payload.menuId,'menuId');
    const ingredientId=this._toInt(payload.ingredientId,'ingredientId');
    const qty=Number(payload.qty);
    if(!Number.isFinite(qty) || qty<=0) throw new ValidationError('qty must be a positive number');
    return this.recipeService.createRecipe({ menuId, ingredientId, qty });
  }
}

