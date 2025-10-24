export default class SupplierPresenter {
  present(record) {
    if (!record) return null;
    return {
      id: record.id,
      name: record.name,
      contactName: record.contactName,
      phone: record.phone,
      email: record.email,
      address: record.address,
    };
  }

  presentCollection(records) { return records.map((r) => this.present(r)); }
}

