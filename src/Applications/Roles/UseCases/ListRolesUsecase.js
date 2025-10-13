import BaseRoleUsecase from './BaseRoleUsecase.js';
import Role from '../../../Domains/Roles/Entities/Role.js';

export default class ListRolesUsecase extends BaseRoleUsecase {
  constructor(dependencies = {}) {
    super(dependencies);
  }

  async execute() {
    const records = await this.roleService.listRoles();
    return records.map((record) => Role.fromPersistence(record));
  }
}
