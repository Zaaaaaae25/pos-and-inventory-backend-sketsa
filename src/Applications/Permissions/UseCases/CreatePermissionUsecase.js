import BasePermissionUsecase from './BasePermissionUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class CreatePermissionUsecase extends BasePermissionUsecase {
  async execute(payload = {}) {
    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
      throw new ValidationError('Payload must be an object');
    }

    const name = await this._assertNameAvailable(payload.name);

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

    return this.permissionService.createPermission({ name, description });
  }
}

