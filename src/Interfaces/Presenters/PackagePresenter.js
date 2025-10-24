export default class PackagePresenter {
  present(record) {
    if (!record) return null;
    return { id: record.id, name: record.name, description: record.description };
  }
  presentCollection(records) { return records.map((r) => this.present(r)); }
}

