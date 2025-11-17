export default class Package {
  constructor({ id = null, name, description = null }) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new Package({
      id: record.id ?? null,
      name: record.name,
      description: record.description ?? null,
    });
  }
}
