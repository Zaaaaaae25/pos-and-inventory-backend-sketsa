export default class KitchenOrderPresenter {
  present(record) {
    if (!record) return null;
    return {
      id: record.id,
      transactionItemId: record.transactionItemId,
      status: record.status,
      startedAt: record.startedAt,
      finishedAt: record.finishedAt,
      note: record.note ?? null,
    };
  }

  presentCollection(records) { return records.map((r) => this.present(r)); }
}

