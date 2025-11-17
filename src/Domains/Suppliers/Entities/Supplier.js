export default class Supplier {
  constructor({ id = null, name, contactName = null, phone = null, email = null, address = null }) {
    this.id = id;
    this.name = name;
    this.contactName = contactName;
    this.phone = phone;
    this.email = email;
    this.address = address;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new Supplier({
      id: record.id ?? null,
      name: record.name,
      contactName: record.contactName ?? null,
      phone: record.phone ?? null,
      email: record.email ?? null,
      address: record.address ?? null,
    });
  }
}
