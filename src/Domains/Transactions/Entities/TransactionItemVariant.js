export default class TransactionItemVariant {
  constructor({ id = null, transactionItemId, menuVariantId, extraPrice }) {
    this.id = id;
    this.transactionItemId = transactionItemId;
    this.menuVariantId = menuVariantId;
    this.extraPrice = extraPrice;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new TransactionItemVariant({
      id: record.id ?? null,
      transactionItemId: record.transactionItemId,
      menuVariantId: record.menuVariantId,
      extraPrice: record.extraPrice,
    });
  }
}
