export default class SupplierProductPresenter {
  present(record) {
    if (!record) return null;
    return {
      id: record.id,
      supplierId: record.supplierId,
      ingredientId: record.ingredientId,
      packageId: record.packageId,
      qty: Number(record.qty),
      price: Number(record.price),
      leadTime: record.leadTime ?? null,
      isActive: Boolean(record.isActive),
    };
  }

  presentCollection(records) { return records.map((r) => this.present(r)); }
}

