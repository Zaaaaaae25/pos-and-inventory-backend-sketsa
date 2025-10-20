import Role from '../../Roles/Entities/Role.js';

export default class User {
  constructor({
    id = null,
    name,
    email = null,
    status = 'active',
    authenticationMethod = 'password',
    role = null,
    placeId = null,
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.status = status;
    this.authenticationMethod = authenticationMethod;
    this.role = role;
    this.placeId = placeId;
  }

  static fromPersistence(record) {
    const roleAssignment = (record.userRoles || [])[0];
    const role = Role.fromPersistence(roleAssignment?.role);

    return new User({
      id: record.id,
      name: record.name,
      email: record.email,
      status: record.status,
      authenticationMethod: record.pinCodeHash ? 'pin' : 'password',
      role,
      placeId: roleAssignment?.placeId ?? null,
    });
  }

  static normalizeEmail(email) {
    if (!email) return null;
    return String(email).trim().toLowerCase() || null;
  }
}
