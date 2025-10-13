import BaseRoleUsecase from './BaseRoleUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';
import Role from '../../../Domains/Roles/Entities/Role.js';

export default class CreateRoleUsecase extends BaseRoleUsecase {
  constructor(dependencies = {}) {
    super(dependencies);
  }

  async execute(payload = {}) {
    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
      throw new ValidationError('Payload must be an object');
    }

    if (typeof payload.name !== 'string') {
      throw new ValidationError('name must be a string');
    }

    const normalizedName = await this._assertNameAvailable(payload.name);

    let description = null;
    if (typeof payload.description !== 'undefined') {
      if (payload.description === null) {
        description = null;
      } else if (typeof payload.description === 'string') {
        description = payload.description.trim() || null;
      } else {
        throw new ValidationError('description must be a string');
      }
    }

    const { records } = await this._resolvePermissions(payload.permissions ?? []);

    const created = await this.roleService.createRole({
      roleData: {
        name: normalizedName,
        description,
      },
      permissionIds: records.map((record) => record.id),
    });

    return Role.fromPersistence(created);
  }
}
