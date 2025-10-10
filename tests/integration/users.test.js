import test from 'node:test';
import assert from 'node:assert/strict';

import { createExpressApp } from '../../src/Infrastructures/WebServer/ExpressServer.js';
import createContainer from '../../src/Infrastructures/Containers/index.js';
import UserRepository from '../../src/Domains/Users/Repositories/UserRepository.js';
import RoleRepository from '../../src/Domains/Users/Repositories/RoleRepository.js';

class InMemoryUserRepository extends UserRepository {
  constructor() {
    super();
    this.roles = [
      {
        id: 1,
        name: 'manager',
        description: 'Store manager',
        rolePermissions: [
          { permission: { name: 'manage-users' } },
          { permission: { name: 'view-reports' } },
        ],
      },
      {
        id: 2,
        name: 'cashier',
        description: 'Cashier',
        rolePermissions: [{ permission: { name: 'process-sales' } }],
      },
    ];
    this.users = [
      {
        id: 1,
        name: 'Alice Manager',
        email: 'alice@example.com',
        status: 'active',
        passwordHash: 'hashed-password',
        pinCodeHash: null,
        userRoles: [
          {
            id: 1,
            userId: 1,
            roleId: 1,
            outletId: 101,
            role: this.roles[0],
          },
        ],
      },
      {
        id: 2,
        name: 'Bob Cashier',
        email: null,
        status: 'active',
        passwordHash: null,
        pinCodeHash: 'hashed-pin',
        userRoles: [
          {
            id: 2,
            userId: 2,
            roleId: 2,
            outletId: 102,
            role: this.roles[1],
          },
        ],
      },
    ];
    this.nextId = 3;
    this.nextAssignmentId = 3;
  }

  async findAll() {
    return this.users.map(clone);
  }

  async findById(id) {
    const numericId = Number(id);
    const user = this.users.find((record) => record.id === numericId);
    return user ? clone(user) : null;
  }

  async findRoleByName(roleName) {
    const normalized = String(roleName ?? '').toLowerCase();
    return clone(this.roles.find((role) => role.name === normalized) || null);
  }

  async findByEmail(email) {
    if (!email) {
      return null;
    }

    const record = this.users.find((user) => user.email === email);
    return record ? clone(record) : null;
  }

  async createUser({ userData, roleId, outletId }) {
    const id = this.nextId++;
    const role = this.roles.find((item) => item.id === roleId);
    const assignment = {
      id: this.nextAssignmentId++,
      userId: id,
      roleId,
      outletId: outletId ?? null,
      role,
    };

    const record = {
      id,
      ...userData,
      userRoles: [assignment],
    };

    this.users.push(record);
    return clone(record);
  }

  async updateUser({ id, userData, roleId, outletId }) {
    const numericId = Number(id);
    const role = this.roles.find((item) => item.id === roleId);
    const index = this.users.findIndex((user) => user.id === numericId);

    if (index === -1) {
      throw new Error('USER_NOT_FOUND');
    }

    const existing = this.users[index];
    const updated = {
      ...existing,
      ...userData,
    };

    const assignment = {
      ...(existing.userRoles?.[0] ?? {
        id: this.nextAssignmentId++,
        userId: numericId,
      }),
      roleId,
      outletId: outletId ?? null,
      role,
    };

    updated.userRoles = [assignment];

    this.users[index] = updated;
    return clone(updated);
  }
}

class NoopRoleRepository extends RoleRepository {
  async findAll() {
    return [];
  }

  async findById() {
    return null;
  }

  async findByName() {
    return null;
  }

  async findPermissionsByNames() {
    return [];
  }

  async createRole() {
    throw new Error('NOT_IMPLEMENTED');
  }

  async updateRole() {
    throw new Error('NOT_IMPLEMENTED');
  }

  async deleteRole() {
    throw new Error('NOT_IMPLEMENTED');
  }
}

function clone(record) {
  return record ? JSON.parse(JSON.stringify(record)) : record;
}

function createTestApp() {
  const userRepository = new InMemoryUserRepository();
  const roleRepository = new NoopRoleRepository();
  const container = createContainer({ userRepository, roleRepository });
  const app = createExpressApp({ container });
  const server = app.listen(0);
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  return {
    server,
    baseUrl,
  };
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

test('GET /api/users returns the available users', async (t) => {
  const { server, baseUrl } = createTestApp();
  t.after(() => server.close());

  const response = await httpRequest(baseUrl, {
    method: 'GET',
    path: '/api/users',
  });

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
  assert.equal(response.body.length, 2);
  assert.equal(response.body[0].name, 'Alice Manager');
  assert.equal(response.body[1].authenticationMethod, 'pin');
});

test('GET /api/users/:id returns a single user payload', async (t) => {
  const { server, baseUrl } = createTestApp();
  t.after(() => server.close());

  const response = await httpRequest(baseUrl, {
    method: 'GET',
    path: '/api/users/1',
  });

  assert.equal(response.status, 200);
  assert.equal(response.body.id, 1);
  assert.equal(response.body.role.name, 'manager');
});

test('POST /api/users creates a new managed user', async (t) => {
  const { server, baseUrl } = createTestApp();
  t.after(() => server.close());

  const payload = {
    name: 'Charlie Supervisor',
    roleName: 'manager',
    email: 'charlie@example.com',
    password: 'supersecret',
  };

  const response = await httpRequest(baseUrl, {
    method: 'POST',
    path: '/api/users',
    body: payload,
  });

  assert.equal(response.status, 201);
  assert.equal(response.body.name, 'Charlie Supervisor');
  assert.equal(response.body.email, 'charlie@example.com');
  assert.equal(response.body.role.name, 'manager');
  assert.equal(response.body.authenticationMethod, 'password');
});

test('PATCH /api/users/:id updates user information', async (t) => {
  const { server, baseUrl } = createTestApp();
  t.after(() => server.close());

  const response = await httpRequest(baseUrl, {
    method: 'PATCH',
    path: '/api/users/1',
    body: { name: 'Alice Updated' },
  });

  assert.equal(response.status, 200);
  assert.equal(response.body.name, 'Alice Updated');
});
