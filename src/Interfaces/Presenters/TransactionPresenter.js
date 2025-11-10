export default class TransactionPresenter {
  present(record) {
    if (!record) return null;
    return {
      id: record.id,
      cashierId: record.cashierId,
      placeId: record.placeId,
      tableId: record.tableId,
      orderType: record.orderType,
      total: Number(record.total),
      tax: record.tax == null ? null : Number(record.tax),
      discount: record.discount == null ? null : Number(record.discount),
      paymentMethodId: record.paymentMethodId,
      createdAt: record.createdAt,
    };
  }

  presentCollection(records) { return records.map((r) => this.present(r)); }
}

