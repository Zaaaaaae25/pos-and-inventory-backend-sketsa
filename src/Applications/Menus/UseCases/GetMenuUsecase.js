import BaseMenuUsecase from './BaseMenuUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class GetMenuUsecase extends BaseMenuUsecase {
  async execute(id) {
    const intId = this._toInt(id);
    const rec = await this.menuService.getMenu(intId);
    if (!rec) throw new ValidationError('Menu not found');
    return rec;
  }
}

