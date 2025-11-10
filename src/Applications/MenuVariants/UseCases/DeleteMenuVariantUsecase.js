import BaseMenuVariantUsecase from './BaseMenuVariantUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class DeleteMenuVariantUsecase extends BaseMenuVariantUsecase {
  async execute(id){ const intId=this._toInt(id); const ok=await this.menuVariantService.deleteMenuVariant(intId); if(!ok) throw new ValidationError('Menu variant not found'); return true; }
}

