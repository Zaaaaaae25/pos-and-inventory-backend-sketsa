export default class CategoryPresenter {
  present(model) {
    if (!model) return null;
    return {
      id: model.id,
      name: model.name,
    };
  }
  presentCollection(records = []) { return records.map((r) => this.present(r)); }
}

