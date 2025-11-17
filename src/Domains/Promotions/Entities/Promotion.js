export default class Promotion {
  constructor({ id = null, placeId = null, name, startAt = null, endAt = null }) {
    this.id = id;
    this.placeId = placeId;
    this.name = name;
    this.startAt = startAt;
    this.endAt = endAt;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new Promotion({
      id: record.id ?? null,
      placeId: record.placeId ?? null,
      name: record.name,
      startAt: record.startAt ?? null,
      endAt: record.endAt ?? null,
    });
  }
}
