import BaseMenuVariantUsecase from './BaseMenuVariantUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class CreateMenuVariantUsecase extends BaseMenuVariantUsecase {
  async execute(payload={}){
    const menuId=this._toInt(payload.menuId,'menuId');
    const name=String(payload.name??'').trim();
    if(!name) throw new ValidationError('name is required');
    return this.menuVariantService.createMenuVariant({ menuId, name });
  }
}

