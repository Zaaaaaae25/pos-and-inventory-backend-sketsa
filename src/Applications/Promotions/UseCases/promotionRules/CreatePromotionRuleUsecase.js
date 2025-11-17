import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class CreatePromotionRuleUsecase {
  constructor({ promotionRuleService } = {}) { if (!promotionRuleService) throw new Error('CREATE_PROMOTION_RULE.MISSING_SERVICE'); this.promotionRuleService = promotionRuleService; }
  async execute(payload={}){
    if(typeof payload !== 'object' || payload===null || Array.isArray(payload)) throw new ValidationError('Payload must be an object');
    const data = { promotionId: Number(payload.promotionId) };
    if(!Number.isInteger(data.promotionId) || data.promotionId<=0) throw new ValidationError('promotionId is required');
    if(payload.ruleType !== undefined) data.ruleType = payload.ruleType == null ? null : String(payload.ruleType).trim() || null;
    if(payload.value !== undefined) data.value = payload.value == null ? null : String(payload.value).trim() || null;
    return this.promotionRuleService.create(data);
  }
}

