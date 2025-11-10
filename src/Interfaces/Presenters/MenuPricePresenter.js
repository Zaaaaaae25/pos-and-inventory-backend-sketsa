export default class MenuPricePresenter {
  present(model) {
    if (!model) return null;
    return {
      id: model.id,
      menuId: model.menuId,
      price: Number(model.price),
      effectiveDate: model.effectiveDate instanceof Date ? model.effectiveDate.toISOString().slice(0,10) : model.effectiveDate,
    };
  }
  presentCollection(records = []) { return records.map((r) => this.present(r)); }
}

