export default class InventoryStockDaily {
  constructor({
    id = null,
    placeId,
    ingredientId,
    date,
    openingQty,
    closingQty,
    diffQty = null,
    createdAt,
  }) {
    this.id = id;
    this.placeId = placeId;
    this.ingredientId = ingredientId;
    this.date = date;
    this.openingQty = openingQty;
    this.closingQty = closingQty;
    this.diffQty = diffQty;
    this.createdAt = createdAt;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new InventoryStockDaily({
      id: record.id ?? null,
      placeId: record.placeId,
      ingredientId: record.ingredientId,
      date: record.date,
      openingQty: record.openingQty,
      closingQty: record.closingQty,
      diffQty: record.diffQty ?? null,
      createdAt: record.createdAt,
    });
  }
}
