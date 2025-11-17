import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class CreatePromotionUsecase {
  constructor({ promotionService } = {}) { if (!promotionService) throw new Error('CREATE_PROMOTION.MISSING_SERVICE'); this.promotionService = promotionService; }
  async execute(payload={}){
    if(typeof payload !== 'object' || payload===null || Array.isArray(payload)) throw new ValidationError('Payload must be an object');
    const data = { name: String(payload.name ?? '').trim() };
    if(!data.name) throw new ValidationError('name is required');
    if(payload.placeId !== undefined) data.placeId = payload.placeId==null ? null : Number(payload.placeId);
    if(payload.startAt !== undefined) data.startAt = payload.startAt ? new Date(payload.startAt) : null;
    if(payload.endAt !== undefined) data.endAt = payload.endAt ? new Date(payload.endAt) : null;
    return this.promotionService.create(data);
  }
}

