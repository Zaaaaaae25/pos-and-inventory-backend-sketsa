export default class TransactionItemPresenter {
  present(record) {
    if (!record) return null;
    return {
      id: record.id,
      transactionId: record.transactionId,
      menuId: record.menuId,
      qty: record.qty,
      price: Number(record.price),
      discount: record.discount == null ? null : Number(record.discount),
    };
  }

  presentCollection(records) { return records.map((r) => this.present(r)); }
}

