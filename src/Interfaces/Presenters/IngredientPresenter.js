export default class IngredientPresenter {
  present(ingredient) {
    if (!ingredient) return null;
    return {
      id: ingredient.id,
      name: ingredient.name,
      unitId: ingredient.unitId,
    };
  }

  presentCollection(records) {
    return records.map((r) => this.present(r));
  }
}

