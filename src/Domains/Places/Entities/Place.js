export default class Place {
  constructor({
    id = null,
    name,
    address = null,
    phone = null,
    logoPath = null,
    type = null,
    isActive = true,
  }) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.logoPath = logoPath;
    this.type = type;
    this.isActive = isActive;
  }

  static fromPersistence(record) {
    if (!record) {
      return null;
    }

    return new Place({
      id: record.id,
      name: record.name,
      address: record.address ?? null,
      phone: record.phone ?? null,
      logoPath: record.logoPath ?? record.logo_path ?? null,
      type: record.type ?? null,
      isActive: record.isActive ?? record.is_active ?? true,
    });
  }
}
