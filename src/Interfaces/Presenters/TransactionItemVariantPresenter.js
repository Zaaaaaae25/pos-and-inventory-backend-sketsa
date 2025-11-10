export default class TransactionItemVariantPresenter {
  present(record) {
    if (!record) return null;
    return {
      id: record.id,
      transactionItemId: record.transactionItemId,
      menuVariantId: record.menuVariantId,
      extraPrice: Number(record.extraPrice ?? 0),
    };
  }

  presentCollection(records) { return records.map((r) => this.present(r)); }
}

