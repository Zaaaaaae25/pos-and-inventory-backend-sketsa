export default class MenuPrice {
  constructor({ id = null, menuId, price, effectiveDate }) {
    this.id = id;
    this.menuId = menuId;
    this.price = price;
    this.effectiveDate = effectiveDate;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new MenuPrice({
      id: record.id ?? null,
      menuId: record.menuId,
      price: record.price,
      effectiveDate: record.effectiveDate,
    });
  }
}
