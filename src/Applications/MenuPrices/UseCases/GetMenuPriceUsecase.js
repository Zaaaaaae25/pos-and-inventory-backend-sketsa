import BaseMenuPriceUsecase from './BaseMenuPriceUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class GetMenuPriceUsecase extends BaseMenuPriceUsecase {
  async execute(id) { const intId=this._toInt(id); const rec=await this.menuPriceService.getMenuPrice(intId); if(!rec) throw new ValidationError('Menu price not found'); return rec; }
}

