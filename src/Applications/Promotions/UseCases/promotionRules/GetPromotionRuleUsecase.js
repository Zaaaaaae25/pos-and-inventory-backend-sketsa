import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class GetPromotionRuleUsecase {
  constructor({ promotionRuleService } = {}) { if (!promotionRuleService) throw new Error('GET_PROMOTION_RULE.MISSING_SERVICE'); this.promotionRuleService = promotionRuleService; }
  async execute(id){ const intId=Number(id); if(!Number.isInteger(intId)||intId<=0) throw new ValidationError('id must be positive integer'); const rec = await this.promotionRuleService.get(intId); if(!rec) throw new ValidationError('Promotion rule not found'); return rec; }
}

