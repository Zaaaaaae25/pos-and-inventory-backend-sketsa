import BaseRoleUsecase from './BaseRoleUsecase.js';
import Role from '../../../Domains/Roles/Entities/Role.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';
import AppError from '../../../Commons/Errors/AppError.js';
import HttpStatus from '../../../Commons/Constants/HttpStatus.js';

export default class GetRoleUsecase extends BaseRoleUsecase {
  constructor(dependencies = {}) {
    super(dependencies);
  }

  async execute(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      throw new ValidationError('Invalid role id');
    }

    const record = await this.roleService.getRoleById(numericId);
    if (!record) {
      throw new AppError('Role not found', HttpStatus.NOT_FOUND);
    }

    return Role.fromPersistence(record);
  }
}
