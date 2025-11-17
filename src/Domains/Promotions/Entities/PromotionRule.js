export default class PromotionRule {
  constructor({ id = null, promotionId, ruleType = null, value = null }) {
    this.id = id;
    this.promotionId = promotionId;
    this.ruleType = ruleType;
    this.value = value;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new PromotionRule({
      id: record.id ?? null,
      promotionId: record.promotionId,
      ruleType: record.ruleType ?? null,
      value: record.value ?? null,
    });
  }
}
