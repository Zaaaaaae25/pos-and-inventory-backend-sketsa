import BaseMenuVariantItemUsecase from './BaseMenuVariantItemUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class GetMenuVariantItemUsecase extends BaseMenuVariantItemUsecase {
  async execute(id){ const intId=this._toInt(id); const rec=await this.menuVariantItemService.getMenuVariantItem(intId); if(!rec) throw new ValidationError('Menu variant item not found'); return rec; }
}

