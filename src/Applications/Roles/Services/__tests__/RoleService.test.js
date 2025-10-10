import test from 'node:test';
import assert from 'node:assert/strict';

import RoleService from '../RoleService.js';

class DummyRoleRepository {
  constructor() {
    this._calls = {
      findAll: [],
      findById: [],
      findByName: [],
      findPermissionsByNames: [],
      createRole: [],
      updateRole: [],
      deleteRole: [],
    };
  }

  async findAll() {
    this._calls.findAll.push(null);
    return [{ id: 1 }];
  }

  async findById(id) {
    this._calls.findById.push(id);
    return { id };
  }

  async findByName(name) {
    this._calls.findByName.push(name);
    return { id: 1, name };
  }

  async findPermissionsByNames(names) {
    this._calls.findPermissionsByNames.push(names);
    return names.map((name, index) => ({ id: index + 1, name }));
  }

  async createRole(payload) {
    this._calls.createRole.push(payload);
    return { id: 1, ...payload.roleData };
  }

  async updateRole(payload) {
    this._calls.updateRole.push(payload);
    return { id: payload.id, ...payload.roleData };
  }

  async deleteRole(id) {
    this._calls.deleteRole.push(id);
    return { id };
  }
}

test('RoleService delegates calls to repository', async () => {
  const repository = new DummyRoleRepository();
  const service = new RoleService({ roleRepository: repository });

  const roles = await service.listRoles();
  assert.deepEqual(roles, [{ id: 1 }]);
  assert.equal(repository._calls.findAll.length, 1);

  const role = await service.getRoleById(2);
  assert.equal(role.id, 2);
  assert.deepEqual(repository._calls.findById, [2]);

  const byName = await service.getRoleByName('manager');
  assert.equal(byName.name, 'manager');
  assert.deepEqual(repository._calls.findByName, ['manager']);

  const permissions = await service.findPermissionsByNames(['read']);
  assert.equal(permissions.length, 1);
  assert.deepEqual(repository._calls.findPermissionsByNames, [['read']]);

  await service.createRole({ roleData: { name: 'test' }, permissionIds: [1] });
  assert.equal(repository._calls.createRole.length, 1);

  await service.updateRole({ id: 1, roleData: { name: 'updated' }, permissionIds: [] });
  assert.equal(repository._calls.updateRole.length, 1);

  await service.deleteRole(1);
  assert.deepEqual(repository._calls.deleteRole, [1]);
});

test('RoleService validates repository presence', () => {
  assert.throws(() => new RoleService(), /ROLE_SERVICE.MISSING_REPOSITORY/);
});

test('RoleService validates repository shape', () => {
  assert.throws(
    () =>
      new RoleService({
        roleRepository: {
          findAll() {},
        },
      }),
    /ROLE_SERVICE.INVALID_REPOSITORY/
  );
});
