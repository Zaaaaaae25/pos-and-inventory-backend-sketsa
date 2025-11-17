export default class PromotionRulePresenter {
  present(record){ if(!record) return null; return { id: record.id, promotionId: record.promotionId, ruleType: record.ruleType ?? null, value: record.value ?? null }; }
  presentCollection(records){ return records.map((r)=>this.present(r)); }
}

