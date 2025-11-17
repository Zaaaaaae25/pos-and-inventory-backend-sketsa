export default class MenuVariant {
  constructor({ id = null, menuId, name }) {
    this.id = id;
    this.menuId = menuId;
    this.name = name;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new MenuVariant({
      id: record.id ?? null,
      menuId: record.menuId,
      name: record.name,
    });
  }
}
