export default class Transaction {
  constructor({
    id = null,
    cashierId,
    placeId = null,
    tableId = null,
    orderType = null,
    total,
    tax = null,
    discount = null,
    paymentMethodId = null,
    createdAt,
  }) {
    this.id = id;
    this.cashierId = cashierId;
    this.placeId = placeId;
    this.tableId = tableId;
    this.orderType = orderType;
    this.total = total;
    this.tax = tax;
    this.discount = discount;
    this.paymentMethodId = paymentMethodId;
    this.createdAt = createdAt;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new Transaction({
      id: record.id ?? null,
      cashierId: record.cashierId,
      placeId: record.placeId ?? null,
      tableId: record.tableId ?? null,
      orderType: record.orderType ?? null,
      total: record.total,
      tax: record.tax ?? null,
      discount: record.discount ?? null,
      paymentMethodId: record.paymentMethodId ?? null,
      createdAt: record.createdAt,
    });
  }
}
