export default class IngredientPackage {
  constructor({ id = null, ingredientId, packageId, qty }) {
    this.id = id;
    this.ingredientId = ingredientId;
    this.packageId = packageId;
    this.qty = qty;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new IngredientPackage({
      id: record.id ?? null,
      ingredientId: record.ingredientId,
      packageId: record.packageId,
      qty: record.qty,
    });
  }
}
