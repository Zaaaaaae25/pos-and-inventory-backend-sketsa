import BaseMenuVariantItemUsecase from './BaseMenuVariantItemUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class UpdateMenuVariantItemUsecase extends BaseMenuVariantItemUsecase {
  async execute(id,payload={}){
    const intId=this._toInt(id);
    const data={};
    if(typeof payload.menuVariantId!=='undefined') data.menuVariantId=this._toInt(payload.menuVariantId,'menuVariantId');
    if(typeof payload.name!=='undefined') data.name=String(payload.name).trim();
    if(typeof payload.additionalPrice!=='undefined') {
      const ap=Number(payload.additionalPrice); if(!Number.isFinite(ap)) throw new ValidationError('additionalPrice must be a number'); data.additionalPrice=ap;
    }
    if(Object.keys(data).length===0) throw new ValidationError('No valid fields to update');
    const rec=await this.menuVariantItemService.updateMenuVariantItem({ id:intId, data });
    if(!rec) throw new ValidationError('Menu variant item not found');
    return rec;
  }
}

