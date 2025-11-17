export default class MenuVariantItem {
  constructor({ id = null, menuVariantId, name, additionalPrice = null }) {
    this.id = id;
    this.menuVariantId = menuVariantId;
    this.name = name;
    this.additionalPrice = additionalPrice;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new MenuVariantItem({
      id: record.id ?? null,
      menuVariantId: record.menuVariantId,
      name: record.name,
      additionalPrice: record.additionalPrice ?? null,
    });
  }
}
