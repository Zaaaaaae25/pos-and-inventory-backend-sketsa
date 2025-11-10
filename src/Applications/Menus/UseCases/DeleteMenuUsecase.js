import BaseMenuUsecase from './BaseMenuUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class DeleteMenuUsecase extends BaseMenuUsecase {
  async execute(id) {
    const intId = this._toInt(id);
    const ok = await this.menuService.deleteMenu(intId);
    if (!ok) throw new ValidationError('Menu not found');
    return true;
  }
}

