export default class IngredientPackagePresenter {
  present(record) {
    if (!record) return null;
    return {
      id: record.id,
      ingredientId: record.ingredientId,
      packageId: record.packageId,
      qty: Number(record.qty),
    };
  }

  presentCollection(records) {
    return records.map((r) => this.present(r));
  }
}

