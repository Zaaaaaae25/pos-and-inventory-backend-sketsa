import BaseMenuUsecase from './BaseMenuUsecase.js';

export default class CreateMenuUsecase extends BaseMenuUsecase {
  async execute(payload = {}) {
    const name = String(payload?.name ?? '').trim();
    if (!name) throw new Error('name is required');
    const data = { name };
    if (payload.placeId != null) data.placeId = Number(payload.placeId);
    if (payload.categoryId != null) data.categoryId = Number(payload.categoryId);
    if (typeof payload.description !== 'undefined') data.description = payload.description ?? null;
    if (typeof payload.isActive === 'boolean') data.isActive = payload.isActive;
    return this.menuService.createMenu(data);
  }
}

