export default class RoleRepository {
  async findAll() {
    throw new Error('ROLE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async findById(id) {
    throw new Error('ROLE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async findByName(name) {
    throw new Error('ROLE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async findPermissionsByNames(permissionNames) {
    throw new Error('ROLE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async createRole({ roleData, permissionIds }) {
    throw new Error('ROLE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateRole({ id, roleData, permissionIds }) {
    throw new Error('ROLE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteRole(id) {
    throw new Error('ROLE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}
