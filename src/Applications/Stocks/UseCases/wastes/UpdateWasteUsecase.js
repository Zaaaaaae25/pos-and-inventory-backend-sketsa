import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class UpdateWasteUsecase {
  constructor({ wasteService } = {}) { if (!wasteService) throw new Error('UPDATE_WASTE.MISSING_SERVICE'); this.wasteService = wasteService; }
  async execute(id, payload = {}) {
    const intId = Number(id); if (!Number.isInteger(intId) || intId <= 0) throw new ValidationError('id must be positive integer');
    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) throw new ValidationError('Payload must be an object');
    const data = {};
    if (payload.ingredientId !== undefined) data.ingredientId = Number(payload.ingredientId);
    if (payload.placeId !== undefined) data.placeId = payload.placeId == null ? null : Number(payload.placeId);
    if (payload.qty !== undefined) data.qty = Number(payload.qty);
    if (payload.reason !== undefined) data.reason = payload.reason;
    const rec = await this.wasteService.update({ id: intId, data });
    if (!rec) throw new ValidationError('Waste not found');
    return rec;
  }
}

