import BaseMenuVariantItemUsecase from './BaseMenuVariantItemUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class DeleteMenuVariantItemUsecase extends BaseMenuVariantItemUsecase {
  async execute(id){ const intId=this._toInt(id); const ok=await this.menuVariantItemService.deleteMenuVariantItem(intId); if(!ok) throw new ValidationError('Menu variant item not found'); return true; }
}

