import BaseMenuVariantItemUsecase from './BaseMenuVariantItemUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class CreateMenuVariantItemUsecase extends BaseMenuVariantItemUsecase {
  async execute(payload={}){
    const menuVariantId=this._toInt(payload.menuVariantId,'menuVariantId');
    const name=String(payload.name??'').trim();
    if(!name) throw new ValidationError('name is required');
    const additionalPrice = Number(payload.additionalPrice ?? 0);
    if (!Number.isFinite(additionalPrice)) throw new ValidationError('additionalPrice must be a number');
    return this.menuVariantItemService.createMenuVariantItem({ menuVariantId, name, additionalPrice });
  }
}

