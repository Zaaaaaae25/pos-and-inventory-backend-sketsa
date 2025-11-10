import BaseRecipeUsecase from './BaseRecipeUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class UpdateRecipeUsecase extends BaseRecipeUsecase {
  async execute(id,payload={}){
    const intId=this._toInt(id);
    const data={};
    if(typeof payload.menuId!=='undefined') data.menuId=this._toInt(payload.menuId,'menuId');
    if(typeof payload.ingredientId!=='undefined') data.ingredientId=this._toInt(payload.ingredientId,'ingredientId');
    if(typeof payload.qty!=='undefined') {
      const q=Number(payload.qty); if(!Number.isFinite(q)||q<=0) throw new ValidationError('qty must be a positive number'); data.qty=q;
    }
    if(Object.keys(data).length===0) throw new ValidationError('No valid fields to update');
    const rec=await this.recipeService.updateRecipe({ id:intId, data });
    if(!rec) throw new ValidationError('Recipe not found');
    return rec;
  }
}

