import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class CreateWasteUsecase {
  constructor({ wasteService } = {}) { if (!wasteService) throw new Error('CREATE_WASTE.MISSING_SERVICE'); this.wasteService = wasteService; }
  async execute(payload = {}) {
    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) throw new ValidationError('Payload must be an object');
    const data = { ingredientId: Number(payload.ingredientId), qty: Number(payload.qty) };
    if (payload.placeId !== undefined) data.placeId = payload.placeId == null ? null : Number(payload.placeId);
    if (payload.reason !== undefined) data.reason = payload.reason;
    return this.wasteService.create(data);
  }
}

