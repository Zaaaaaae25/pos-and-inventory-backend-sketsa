import BaseMenuUsecase from './BaseMenuUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class UpdateMenuUsecase extends BaseMenuUsecase {
  async execute(id, payload = {}) {
    const intId = this._toInt(id);
    const data = {};
    if (typeof payload.name !== 'undefined') data.name = String(payload.name).trim();
    if (typeof payload.description !== 'undefined') data.description = payload.description ?? null;
    if (typeof payload.isActive === 'boolean') data.isActive = payload.isActive;
    if (typeof payload.placeId !== 'undefined') data.placeId = Number(payload.placeId);
    if (typeof payload.categoryId !== 'undefined') data.categoryId = Number(payload.categoryId);
    if (Object.keys(data).length === 0) throw new ValidationError('No valid fields to update');
    const rec = await this.menuService.updateMenu({ id: intId, data });
    if (!rec) throw new ValidationError('Menu not found');
    return rec;
  }
}

