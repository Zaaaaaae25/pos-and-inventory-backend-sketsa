import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class DeletePromotionUsecase {
  constructor({ promotionService } = {}) { if (!promotionService) throw new Error('DELETE_PROMOTION.MISSING_SERVICE'); this.promotionService = promotionService; }
  async execute(id){ const intId=Number(id); if(!Number.isInteger(intId)||intId<=0) throw new ValidationError('id must be positive integer'); const ok = await this.promotionService.delete(intId); if(!ok) throw new ValidationError('Promotion not found'); return true; }
}

