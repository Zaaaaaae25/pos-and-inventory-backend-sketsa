export default class Role {
  constructor({ id, name, description = null, permissions = [] }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.permissions = permissions;
  }

  static fromPersistence(record) {
    if (!record) {
      return null;
    }

    const permissions = (record.rolePermissions || [])
      .map((rolePermission) => rolePermission.permission?.name)
      .filter(Boolean);

    return new Role({
      id: record.id,
      name: record.name,
      description: record.description,
      permissions,
    });
  }

  isCashier() {
    return this.name?.toLowerCase() === 'cashier';
  }
}
