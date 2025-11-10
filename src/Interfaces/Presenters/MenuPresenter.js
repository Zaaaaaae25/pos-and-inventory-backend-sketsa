export default class MenuPresenter {
  present(model) {
    if (!model) return null;
    return {
      id: model.id,
      placeId: model.placeId ?? null,
      name: model.name,
      categoryId: model.categoryId ?? null,
      description: model.description ?? null,
      isActive: model.isActive,
    };
  }
  presentCollection(records = []) { return records.map((r) => this.present(r)); }
}

