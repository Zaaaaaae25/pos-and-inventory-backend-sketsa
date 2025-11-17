export default class Category {
  constructor({ id = null, name }) {
    this.id = id;
    this.name = name;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new Category({
      id: record.id ?? null,
      name: record.name ?? null,
    });
  }
}
