import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class DeletePromotionRuleUsecase {
  constructor({ promotionRuleService } = {}) { if (!promotionRuleService) throw new Error('DELETE_PROMOTION_RULE.MISSING_SERVICE'); this.promotionRuleService = promotionRuleService; }
  async execute(id){ const intId=Number(id); if(!Number.isInteger(intId)||intId<=0) throw new ValidationError('id must be positive integer'); const ok = await this.promotionRuleService.delete(intId); if(!ok) throw new ValidationError('Promotion rule not found'); return true; }
}

