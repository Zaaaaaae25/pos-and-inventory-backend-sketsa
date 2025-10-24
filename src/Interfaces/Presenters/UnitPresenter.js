export default class UnitPresenter {
  present(unit) {
    if (!unit) return null;
    return {
      id: unit.id,
      name: unit.name,
      abbreviation: unit.abbreviation,
    };
  }

  presentCollection(records) {
    return records.map((r) => this.present(r));
  }
}

