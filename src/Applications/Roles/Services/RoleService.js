import RoleRepository from '../../../Domains/Users/Repositories/RoleRepository.js';

export default class RoleService {
  constructor({ roleRepository } = {}) {
    if (!roleRepository) {
      throw new Error('ROLE_SERVICE.MISSING_REPOSITORY');
    }

    if (!(roleRepository instanceof RoleRepository)) {
      const requiredMethods = [
        'findAll',
        'findById',
        'findByName',
        'findPermissionsByNames',
        'createRole',
        'updateRole',
        'deleteRole',
      ];

      const missingMethod = requiredMethods.find(
        (method) => typeof roleRepository[method] !== 'function'
      );

      if (missingMethod) {
        throw new Error(`ROLE_SERVICE.INVALID_REPOSITORY: missing ${missingMethod}`);
      }
    }

    this._roleRepository = roleRepository;
  }

  async listRoles() {
    return this._roleRepository.findAll();
  }

  async getRoleById(id) {
    return this._roleRepository.findById(id);
  }

  async getRoleByName(name) {
    return this._roleRepository.findByName(name);
  }

  async findPermissionsByNames(permissionNames) {
    return this._roleRepository.findPermissionsByNames(permissionNames);
  }

  async createRole(payload) {
    return this._roleRepository.createRole(payload);
  }

  async updateRole(payload) {
    return this._roleRepository.updateRole(payload);
  }

  async deleteRole(id) {
    return this._roleRepository.deleteRole(id);
  }
}
