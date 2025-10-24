import BasePermissionUsecase from './BasePermissionUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class GetPermissionUsecase extends BasePermissionUsecase {
  async execute(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      throw new ValidationError('Invalid id');
    }
    const record = await this.permissionService.getPermission(numericId);
    if (!record) {
      throw new ValidationError('Permission not found');
    }
    return record;
  }
}

