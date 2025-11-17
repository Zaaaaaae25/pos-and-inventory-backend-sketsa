import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class GetPromotionUsecase {
  constructor({ promotionService } = {}) { if (!promotionService) throw new Error('GET_PROMOTION.MISSING_SERVICE'); this.promotionService = promotionService; }
  async execute(id){ const intId=Number(id); if(!Number.isInteger(intId)||intId<=0) throw new ValidationError('id must be positive integer'); const rec = await this.promotionService.get(intId); if(!rec) throw new ValidationError('Promotion not found'); return rec; }
}

