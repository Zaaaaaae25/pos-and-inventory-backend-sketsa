export default class Unit {
  constructor({ id = null, name, abbreviation }) {
    this.id = id;
    this.name = name;
    this.abbreviation = abbreviation;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new Unit({
      id: record.id ?? null,
      name: record.name,
      abbreviation: record.abbreviation,
    });
  }
}
