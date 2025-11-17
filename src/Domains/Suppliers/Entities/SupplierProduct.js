export default class SupplierProduct {
  constructor({
    id = null,
    supplierId,
    ingredientId,
    packageId,
    qty,
    price,
    leadTime = null,
    isActive = true,
  }) {
    this.id = id;
    this.supplierId = supplierId;
    this.ingredientId = ingredientId;
    this.packageId = packageId;
    this.qty = qty;
    this.price = price;
    this.leadTime = leadTime;
    this.isActive = isActive;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new SupplierProduct({
      id: record.id ?? null,
      supplierId: record.supplierId,
      ingredientId: record.ingredientId,
      packageId: record.packageId,
      qty: record.qty,
      price: record.price,
      leadTime: record.leadTime ?? null,
      isActive: record.isActive ?? true,
    });
  }
}
