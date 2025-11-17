export default class Waste {
  constructor({ id = null, ingredientId, placeId = null, qty, reason = null, createdAt }) {
    this.id = id;
    this.ingredientId = ingredientId;
    this.placeId = placeId;
    this.qty = qty;
    this.reason = reason;
    this.createdAt = createdAt;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new Waste({
      id: record.id ?? null,
      ingredientId: record.ingredientId,
      placeId: record.placeId ?? null,
      qty: record.qty,
      reason: record.reason ?? null,
      createdAt: record.createdAt,
    });
  }
}
