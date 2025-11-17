export default class TransactionItem {
  constructor({
    id = null,
    transactionId,
    menuId,
    qty,
    price,
    discount = null,
  }) {
    this.id = id;
    this.transactionId = transactionId;
    this.menuId = menuId;
    this.qty = qty;
    this.price = price;
    this.discount = discount;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new TransactionItem({
      id: record.id ?? null,
      transactionId: record.transactionId,
      menuId: record.menuId,
      qty: record.qty,
      price: record.price,
      discount: record.discount ?? null,
    });
  }
}
