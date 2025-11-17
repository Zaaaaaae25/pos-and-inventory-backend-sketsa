export default class PlaceStock {
  constructor({ id = null, placeId, ingredientId, qty, unitId }) {
    this.id = id;
    this.placeId = placeId;
    this.ingredientId = ingredientId;
    this.qty = qty;
    this.unitId = unitId;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new PlaceStock({
      id: record.id ?? null,
      placeId: record.placeId,
      ingredientId: record.ingredientId,
      qty: record.qty,
      unitId: record.unitId,
    });
  }
}
