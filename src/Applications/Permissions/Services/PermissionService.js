import PermissionRepository from '../../../Domains/Permissions/Repositories/PermissionRepository.js';

export default class PermissionService {
  constructor({ permissionRepository } = {}) {
    if (!permissionRepository) {
      throw new Error('PERMISSION_SERVICE.MISSING_REPOSITORY');
    }

    if (!(permissionRepository instanceof PermissionRepository)) {
      const requiredMethods = [
        'findAll',
        'findById',
        'findByName',
        'createPermission',
        'updatePermission',
        'deletePermission',
      ];

      const missingMethod = requiredMethods.find(
        (m) => typeof permissionRepository[m] !== 'function'
      );

      if (missingMethod) {
        throw new Error(`PERMISSION_SERVICE.INVALID_REPOSITORY: missing ${missingMethod}`);
      }
    }

    this._permissionRepository = permissionRepository;
  }

  async listPermissions() {
    return this._permissionRepository.findAll();
  }

  async getPermission(id) {
    return this._permissionRepository.findById(id);
  }

  async getPermissionByName(name) {
    return this._permissionRepository.findByName(name);
  }

  async createPermission(permissionData) {
    return this._permissionRepository.createPermission(permissionData);
  }

  async updatePermission(payload) {
    return this._permissionRepository.updatePermission(payload);
  }

  async deletePermission(id) {
    return this._permissionRepository.deletePermission(id);
  }
}

