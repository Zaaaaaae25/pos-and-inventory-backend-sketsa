import BasePermissionUsecase from './BasePermissionUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class DeletePermissionUsecase extends BasePermissionUsecase {
  async execute(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      throw new ValidationError('Invalid id');
    }
    await this.permissionService.deletePermission(numericId);
    return true;
  }
}

