export default class TablePresenter {
  present(table) {
    if (!table) return null;
    return {
      id: table.id,
      placeId: table.placeId,
      name: table.name,
      status: table.status,
    };
  }

  presentCollection(records) {
    return records.map((r) => this.present(r));
  }
}

