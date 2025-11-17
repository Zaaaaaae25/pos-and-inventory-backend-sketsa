export default class PaymentMethod {
  constructor({ id = null, name, description = null, isActive = true }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isActive = isActive;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new PaymentMethod({
      id: record.id ?? null,
      name: record.name,
      description: record.description ?? null,
      isActive: record.isActive ?? true,
    });
  }
}
