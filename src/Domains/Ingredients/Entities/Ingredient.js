export default class Ingredient {
  constructor({ id = null, name, unitId }) {
    this.id = id;
    this.name = name;
    this.unitId = unitId;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new Ingredient({
      id: record.id ?? null,
      name: record.name,
      unitId: record.unitId,
    });
  }
}
