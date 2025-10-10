import test from 'node:test';
import assert from 'node:assert/strict';

import { createExpressApp } from '../../src/Infrastructures/WebServer/ExpressServer.js';
import createContainer from '../../src/Infrastructures/Containers/index.js';
import RoleRepository from '../../src/Domains/Users/Repositories/RoleRepository.js';
import UserRepository from '../../src/Domains/Users/Repositories/UserRepository.js';

class InMemoryRoleRepository extends RoleRepository {
  constructor() {
    super();
    this.permissions = [
      { id: 1, name: 'manage_orders' },
      { id: 2, name: 'view_reports' },
      { id: 3, name: 'manage_staff' },
    ];
    this.roles = [
      {
        id: 1,
        name: 'manager',
        description: 'Manage outlet operations',
        rolePermissions: [
          { permission: { id: 1, name: 'manage_orders' } },
          { permission: { id: 2, name: 'view_reports' } },
        ],
        userRoles: [],
      },
    ];
    this.nextId = 2;
  }

  async findAll() {
    return this.roles.map(clone);
  }

  async findById(id) {
    const numericId = Number(id);
    const role = this.roles.find((item) => item.id === numericId);
    return clone(role);
  }

  async findByName(name) {
    if (!name) return null;
    const normalized = String(name).toLowerCase();
    const role = this.roles.find((item) => item.name === normalized);
    return clone(role);
  }

  async findPermissionsByNames(permissionNames) {
    return permissionNames
      .map((name) => this.permissions.find((permission) => permission.name === name))
      .filter(Boolean)
      .map(clone);
  }

  async createRole({ roleData, permissionIds }) {
    const id = this.nextId++;
    const rolePermissions = permissionIds.map((permissionId) => ({
      permission: clone(this.permissions.find((item) => item.id === permissionId)),
    }));

    const record = {
      id,
      name: roleData.name,
      description: roleData.description ?? null,
      rolePermissions,
      userRoles: [],
    };

    this.roles.push(record);
    return clone(record);
  }

  async updateRole({ id, roleData, permissionIds }) {
    const numericId = Number(id);
    const index = this.roles.findIndex((role) => role.id === numericId);
    if (index === -1) {
      throw new Error('ROLE_NOT_FOUND');
    }

    const rolePermissions = permissionIds.map((permissionId) => ({
      permission: clone(this.permissions.find((item) => item.id === permissionId)),
    }));

    const existing = this.roles[index];
    const updated = {
      ...existing,
      name: roleData.name,
      description: roleData.description ?? null,
      rolePermissions,
    };

    this.roles[index] = updated;
    return clone(updated);
  }

  async deleteRole(id) {
    const numericId = Number(id);
    const index = this.roles.findIndex((role) => role.id === numericId);
    if (index !== -1) {
      this.roles.splice(index, 1);
    }
  }
}

class NoopUserRepository extends UserRepository {
  async findAll() {
    return [];
  }

  async findById() {
    return null;
  }

  async findRoleByName() {
    return null;
  }

  async findByEmail() {
    return null;
  }

  async createUser() {
    throw new Error('NOT_IMPLEMENTED');
  }

  async updateUser() {
    throw new Error('NOT_IMPLEMENTED');
  }
}

function clone(value) {
  return value ? JSON.parse(JSON.stringify(value)) : value;
}

function createTestApp() {
  const roleRepository = new InMemoryRoleRepository();
  const userRepository = new NoopUserRepository();
  const container = createContainer({ roleRepository, userRepository });
  const app = createExpressApp({ container });
  const server = app.listen(0);
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  return { server, baseUrl, roleRepository };
}

async function httpRequest(baseUrl, { method, path, body }) {
  const init = {
    method,
    headers: {
      'content-type': 'application/json',
    },
  };

  if (body) {
    init.body = JSON.stringify(body);
  }

  const response = await fetch(`${baseUrl}${path}`, init);
  const text = await response.text();
  let parsed;

  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch (error) {
      parsed = text;
    }
  }

  return {
    status: response.status,
    body: parsed,
  };
}

test('GET /api/roles returns available roles with permissions', async (t) => {
  const { server, baseUrl } = createTestApp();
  t.after(() => server.close());

  const response = await httpRequest(baseUrl, {
    method: 'GET',
    path: '/api/roles',
  });

  assert.equal(response.status, 200);
  assert.equal(response.body.length, 1);
  assert.deepEqual(response.body[0].permissions, ['manage_orders', 'view_reports']);
});

test('POST /api/roles creates a new role', async (t) => {
  const { server, baseUrl, roleRepository } = createTestApp();
  t.after(() => server.close());

  const payload = {
    name: 'Supervisor',
    description: 'Shift supervisor',
    permissions: ['view_reports'],
  };

  const response = await httpRequest(baseUrl, {
    method: 'POST',
    path: '/api/roles',
    body: payload,
  });

  assert.equal(response.status, 201);
  assert.equal(response.body.name, 'supervisor');
  assert.deepEqual(response.body.permissions, ['view_reports']);

  const created = roleRepository.roles.find((role) => role.name === 'supervisor');
  assert.ok(created);
  assert.equal(created.rolePermissions.length, 1);
});

test('POST /api/roles rejects unknown permissions', async (t) => {
  const { server, baseUrl } = createTestApp();
  t.after(() => server.close());

  const response = await httpRequest(baseUrl, {
    method: 'POST',
    path: '/api/roles',
    body: {
      name: 'auditor',
      permissions: ['invalid_permission'],
    },
  });

  assert.equal(response.status, 400);
  assert.equal(response.body.message, 'Some permissions are not registered');
  assert.deepEqual(response.body.details, { missing: ['invalid_permission'] });
});

test('GET /api/roles/{id} returns a role or not found', async (t) => {
  const { server, baseUrl } = createTestApp();
  t.after(() => server.close());

  const ok = await httpRequest(baseUrl, {
    method: 'GET',
    path: '/api/roles/1',
  });

  assert.equal(ok.status, 200);
  assert.equal(ok.body.id, 1);

  const invalid = await httpRequest(baseUrl, {
    method: 'GET',
    path: '/api/roles/foo',
  });
  assert.equal(invalid.status, 400);

  const missing = await httpRequest(baseUrl, {
    method: 'GET',
    path: '/api/roles/99',
  });
  assert.equal(missing.status, 404);
});

test('PUT /api/roles/{id} updates role name and permissions', async (t) => {
  const { server, baseUrl, roleRepository } = createTestApp();
  t.after(() => server.close());

  const response = await httpRequest(baseUrl, {
    method: 'PUT',
    path: '/api/roles/1',
    body: {
      name: 'Operations Manager',
      permissions: ['manage_staff'],
    },
  });

  assert.equal(response.status, 200);
  assert.equal(response.body.name, 'operations manager');
  assert.deepEqual(response.body.permissions, ['manage_staff']);

  const updated = roleRepository.roles.find((role) => role.id === 1);
  assert.equal(updated.rolePermissions.length, 1);
  assert.equal(updated.rolePermissions[0].permission.name, 'manage_staff');
});

test('DELETE /api/roles/{id} removes a role when not assigned', async (t) => {
  const { server, baseUrl, roleRepository } = createTestApp();
  t.after(() => server.close());

  const createResponse = await httpRequest(baseUrl, {
    method: 'POST',
    path: '/api/roles',
    body: {
      name: 'temporary',
      permissions: [],
    },
  });

  assert.equal(createResponse.status, 201);
  const roleId = createResponse.body.id;

  const deleteResponse = await httpRequest(baseUrl, {
    method: 'DELETE',
    path: `/api/roles/${roleId}`,
  });

  assert.equal(deleteResponse.status, 204);
  assert.ok(!roleRepository.roles.find((role) => role.id === roleId));
});

test('DELETE /api/roles/{id} rejects deletion when role assigned to user', async (t) => {
  const { server, baseUrl, roleRepository } = createTestApp();
  t.after(() => server.close());

  roleRepository.roles[0].userRoles = [{ id: 1, userId: 10 }];

  const response = await httpRequest(baseUrl, {
    method: 'DELETE',
    path: '/api/roles/1',
  });

  assert.equal(response.status, 400);
  assert.equal(response.body.message, 'Role cannot be deleted while assigned to users');
});
