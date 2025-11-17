export default class StockTransfer {
  constructor({
    id = null,
    ingredientId,
    fromPlaceId = null,
    toPlaceId = null,
    qty,
    createdAt,
  }) {
    this.id = id;
    this.ingredientId = ingredientId;
    this.fromPlaceId = fromPlaceId;
    this.toPlaceId = toPlaceId;
    this.qty = qty;
    this.createdAt = createdAt;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new StockTransfer({
      id: record.id ?? null,
      ingredientId: record.ingredientId,
      fromPlaceId: record.fromPlaceId ?? null,
      toPlaceId: record.toPlaceId ?? null,
      qty: record.qty,
      createdAt: record.createdAt,
    });
  }
}
