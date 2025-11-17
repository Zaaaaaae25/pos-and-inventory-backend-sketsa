export default class Table {
  constructor({ id = null, placeId, name, status = null }) {
    this.id = id;
    this.placeId = placeId;
    this.name = name;
    this.status = status;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new Table({
      id: record.id ?? null,
      placeId: record.placeId,
      name: record.name,
      status: record.status ?? null,
    });
  }
}
