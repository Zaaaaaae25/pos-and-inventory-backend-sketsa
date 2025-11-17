export default class Recipe {
  constructor({ id = null, menuId, ingredientId, qty }) {
    this.id = id;
    this.menuId = menuId;
    this.ingredientId = ingredientId;
    this.qty = qty;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new Recipe({
      id: record.id ?? null,
      menuId: record.menuId,
      ingredientId: record.ingredientId,
      qty: record.qty,
    });
  }
}
