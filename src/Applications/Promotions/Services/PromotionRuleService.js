import PromotionRuleRepository from '../../../Domains/Promotions/Repositories/PromotionRuleRepository.js';

export default class PromotionRuleService {
  constructor({ promotionRuleRepository } = {}) {
    if (!promotionRuleRepository) throw new Error('PROMOTION_RULE_SERVICE.MISSING_REPOSITORY');
    if (!(promotionRuleRepository instanceof PromotionRuleRepository)) {
      const req = ['findAll','findById','createPromotionRule','deletePromotionRule'];
      const miss = req.find((m) => typeof promotionRuleRepository[m] !== 'function');
      if (miss) throw new Error(`PROMOTION_RULE_SERVICE.INVALID_REPOSITORY: missing ${miss}`);
    }
    this._repo = promotionRuleRepository;
  }
  list(){ return this._repo.findAll(); }
  get(id){ return this._repo.findById(id); }
  create(data){ return this._repo.createPromotionRule(data); }
  delete(id){ return this._repo.deletePromotionRule(id); }
}

