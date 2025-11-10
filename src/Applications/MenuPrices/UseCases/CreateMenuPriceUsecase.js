import BaseMenuPriceUsecase from './BaseMenuPriceUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class CreateMenuPriceUsecase extends BaseMenuPriceUsecase {
  async execute(payload = {}) {
    const menuId = this._toInt(payload.menuId, 'menuId');
    const price = Number(payload.price);
    if (!Number.isFinite(price)) throw new ValidationError('price must be a number');
    const effectiveDate = payload.effectiveDate ? new Date(payload.effectiveDate) : new Date();
    return this.menuPriceService.createMenuPrice({ menuId, price, effectiveDate });
  }
}

