import BaseMenuVariantUsecase from './BaseMenuVariantUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class UpdateMenuVariantUsecase extends BaseMenuVariantUsecase {
  async execute(id,payload={}){
    const intId=this._toInt(id);
    const data={};
    if(typeof payload.menuId!=='undefined') data.menuId=this._toInt(payload.menuId,'menuId');
    if(typeof payload.name!=='undefined') data.name=String(payload.name).trim();
    if(Object.keys(data).length===0) throw new ValidationError('No valid fields to update');
    const rec=await this.menuVariantService.updateMenuVariant({ id:intId, data });
    if(!rec) throw new ValidationError('Menu variant not found');
    return rec;
  }
}

