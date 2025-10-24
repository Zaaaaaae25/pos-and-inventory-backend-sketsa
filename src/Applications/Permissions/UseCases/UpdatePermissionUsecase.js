import BasePermissionUsecase from './BasePermissionUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class UpdatePermissionUsecase extends BasePermissionUsecase {
  async execute(id, payload = {}) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      throw new ValidationError('Invalid id');
    }

    const existing = await this.permissionService.getPermission(numericId);
    if (!existing) {
      throw new ValidationError('Permission not found');
    }

    const update = {};
    if (Object.prototype.hasOwnProperty.call(payload, 'name')) {
      update.name = await this._assertNameAvailable(payload.name, numericId);
    }
    if (Object.prototype.hasOwnProperty.call(payload, 'description')) {
      const value = payload.description;
      if (value === null) {
        update.description = null;
      } else if (typeof value === 'string') {
        update.description = value.trim() || null;
      } else {
        throw new ValidationError('description must be a string');
      }
    }

    if (Object.keys(update).length === 0) {
      throw new ValidationError('No updatable fields provided');
    }

    return this.permissionService.updatePermission({ id: numericId, permissionData: update });
  }
}

