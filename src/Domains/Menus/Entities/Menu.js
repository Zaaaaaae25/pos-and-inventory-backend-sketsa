export default class Menu {
  constructor({
    id = null,
    placeId = null,
    name,
    categoryId = null,
    description = null,
    isActive = true,
  }) {
    this.id = id;
    this.placeId = placeId;
    this.name = name;
    this.categoryId = categoryId;
    this.description = description;
    this.isActive = isActive;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new Menu({
      id: record.id ?? null,
      placeId: record.placeId ?? null,
      name: record.name,
      categoryId: record.categoryId ?? null,
      description: record.description ?? null,
      isActive: record.isActive ?? true,
    });
  }
}
