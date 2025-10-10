import BaseRoleUsecase from './BaseRoleUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';
import AppError from '../../../Commons/Errors/AppError.js';
import HttpStatus from '../../../Commons/Constants/HttpStatus.js';

export default class DeleteRoleUsecase extends BaseRoleUsecase {
  constructor(dependencies = {}) {
    super(dependencies);
  }

  async execute(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      throw new ValidationError('Invalid role id');
    }

    const existing = await this.roleService.getRoleById(numericId);
    if (!existing) {
      throw new AppError('Role not found', HttpStatus.NOT_FOUND);
    }

    if ((existing.userRoles || []).length > 0) {
      throw new ValidationError('Role cannot be deleted while assigned to users');
    }

    await this.roleService.deleteRole(numericId);
  }
}
