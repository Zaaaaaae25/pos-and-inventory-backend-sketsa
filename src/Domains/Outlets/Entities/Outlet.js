export default class Outlet {
  constructor({ id = null, name, address = null, phone = null, isActive = true }) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.isActive = isActive;
  }

  static fromPersistence(record) {
    if (!record) {
      return null;
    }

    return new Outlet({
      id: record.id,
      name: record.name,
      address: record.address ?? null,
      phone: record.phone ?? null,
      isActive: record.isActive ?? record.is_active ?? true,
    });
  }
}
