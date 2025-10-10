import BaseRoleUsecase from './BaseRoleUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';
import AppError from '../../../Commons/Errors/AppError.js';
import HttpStatus from '../../../Commons/Constants/HttpStatus.js';
import Role from '../../../Domains/Users/Entities/Role.js';

export default class UpdateRoleUsecase extends BaseRoleUsecase {
  constructor(dependencies = {}) {
    super(dependencies);
  }

  async execute(id, payload = {}) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      throw new ValidationError('Invalid role id');
    }

    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
      throw new ValidationError('Payload must be an object');
    }

    const existing = await this.roleService.getRoleById(numericId);
    if (!existing) {
      throw new AppError('Role not found', HttpStatus.NOT_FOUND);
    }

    let normalizedName = existing.name;
    if (Object.prototype.hasOwnProperty.call(payload, 'name')) {
      if (typeof payload.name !== 'string') {
        throw new ValidationError('name must be a string');
      }

      normalizedName = await this._assertNameAvailable(payload.name, numericId);
    }

    let description = existing.description ?? null;
    if (Object.prototype.hasOwnProperty.call(payload, 'description')) {
      if (payload.description === null) {
        description = null;
      } else if (typeof payload.description === 'string') {
        description = payload.description.trim() || null;
      } else {
        throw new ValidationError('description must be a string');
      }
    }

    let permissionIds = (existing.rolePermissions || [])
      .map((assignment) => assignment.permission?.id)
      .filter((value) => typeof value === 'number');

    if (Object.prototype.hasOwnProperty.call(payload, 'permissions')) {
      const { records } = await this._resolvePermissions(payload.permissions);
      permissionIds = records.map((record) => record.id);
    }

    const updated = await this.roleService.updateRole({
      id: numericId,
      roleData: {
        name: normalizedName,
        description,
      },
      permissionIds,
    });

    return Role.fromPersistence(updated);
  }
}
