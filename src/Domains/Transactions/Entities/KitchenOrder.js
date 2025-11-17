export default class KitchenOrder {
  constructor({
    id = null,
    transactionItemId,
    status,
    startedAt = null,
    finishedAt = null,
    note = null,
  }) {
    this.id = id;
    this.transactionItemId = transactionItemId;
    this.status = status;
    this.startedAt = startedAt;
    this.finishedAt = finishedAt;
    this.note = note;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new KitchenOrder({
      id: record.id ?? null,
      transactionItemId: record.transactionItemId,
      status: record.status,
      startedAt: record.startedAt ?? null,
      finishedAt: record.finishedAt ?? null,
      note: record.note ?? null,
    });
  }
}
