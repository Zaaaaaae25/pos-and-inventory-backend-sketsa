import BaseMenuPriceUsecase from './BaseMenuPriceUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class DeleteMenuPriceUsecase extends BaseMenuPriceUsecase {
  async execute(id) { const intId=this._toInt(id); const ok=await this.menuPriceService.deleteMenuPrice(intId); if(!ok) throw new ValidationError('Menu price not found'); return true; }
}

