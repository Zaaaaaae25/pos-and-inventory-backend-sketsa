import BaseMenuVariantUsecase from './BaseMenuVariantUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class GetMenuVariantUsecase extends BaseMenuVariantUsecase {
  async execute(id){ const intId=this._toInt(id); const rec=await this.menuVariantService.getMenuVariant(intId); if(!rec) throw new ValidationError('Menu variant not found'); return rec; }
}

