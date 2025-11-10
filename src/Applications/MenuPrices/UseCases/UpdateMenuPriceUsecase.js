import BaseMenuPriceUsecase from './BaseMenuPriceUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class UpdateMenuPriceUsecase extends BaseMenuPriceUsecase {
  async execute(id, payload = {}) {
    const intId = this._toInt(id);
    const data = {};
    if (typeof payload.menuId !== 'undefined') data.menuId = this._toInt(payload.menuId, 'menuId');
    if (typeof payload.price !== 'undefined') {
      const price = Number(payload.price);
      if (!Number.isFinite(price)) throw new ValidationError('price must be a number');
      data.price = price;
    }
    if (typeof payload.effectiveDate !== 'undefined') data.effectiveDate = new Date(payload.effectiveDate);
    if (Object.keys(data).length === 0) throw new ValidationError('No valid fields to update');
    const rec = await this.menuPriceService.updateMenuPrice({ id: intId, data });
    if (!rec) throw new ValidationError('Menu price not found');
    return rec;
  }
}

