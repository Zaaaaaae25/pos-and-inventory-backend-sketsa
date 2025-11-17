export default class ListPromotionRulesUsecase {
  constructor({ promotionRuleService } = {}) { if (!promotionRuleService) throw new Error('LIST_PROMOTION_RULES.MISSING_SERVICE'); this.promotionRuleService = promotionRuleService; }
  async execute(){ return this.promotionRuleService.list(); }
}

