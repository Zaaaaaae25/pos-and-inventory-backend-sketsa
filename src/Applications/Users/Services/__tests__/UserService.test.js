import test from 'node:test';
import assert from 'node:assert/strict';

import UserService from '../UserService.js';
import UserRepository from '../../../../Domains/Users/Repositories/UserRepository.js';

test('UserService throws when repository dependency is missing', () => {
  assert.throws(() => {
    // eslint-disable-next-line no-new
    new UserService();
  }, /USER_SERVICE.MISSING_REPOSITORY/);
});

class StubUserRepository extends UserRepository {
  constructor() {
    super();
    this._calls = {
      findAll: 0,
      findById: [],
      findRoleByName: [],
      findByEmail: [],
      createUser: [],
      updateUser: [],
    };
  }

  async findAll() {
    this._calls.findAll += 1;
    return ['alice', 'bob'];
  }

  async findById(id) {
    this._calls.findById.push(id);
    return { id, name: 'Test User' };
  }

  async findRoleByName(roleName) {
    this._calls.findRoleByName.push(roleName);
    return { id: 1, name: roleName };
  }

  async findByEmail(email) {
    this._calls.findByEmail.push(email);
    return email ? { id: 2, email } : null;
  }

  async createUser(payload) {
    this._calls.createUser.push(payload);
    return { id: 3, ...payload };
  }

  async updateUser(payload) {
    this._calls.updateUser.push(payload);
    return { id: payload.id ?? 4, ...payload };
  }
}

test('UserService delegates method calls to the repository implementation', async () => {
  const repository = new StubUserRepository();
  const service = new UserService({ userRepository: repository });

  const users = await service.listUsers();
  assert.deepEqual(users, ['alice', 'bob']);
  assert.equal(repository._calls.findAll, 1);

  const fetched = await service.getUser(42);
  assert.equal(fetched.id, 42);
  assert.deepEqual(repository._calls.findById, [42]);

  const role = await service.findRoleByName('manager');
  assert.equal(role.name, 'manager');
  assert.deepEqual(repository._calls.findRoleByName, ['manager']);

  const emailMatch = await service.findByEmail('test@example.com');
  assert.equal(emailMatch.email, 'test@example.com');
  assert.deepEqual(repository._calls.findByEmail, ['test@example.com']);

  const created = await service.createUser({ name: 'Charlie' });
  assert.equal(created.name, 'Charlie');
  assert.equal(repository._calls.createUser.length, 1);

  const updated = await service.updateUser({ id: 7, name: 'Updated' });
  assert.equal(updated.id, 7);
  assert.equal(repository._calls.updateUser.length, 1);
});

test('UserService validates duck-typed repositories expose required methods', () => {
  const invalidRepository = {
    findAll() {},
    findById() {},
    findRoleByName() {},
    findByEmail() {},
    // createUser is intentionally missing
    updateUser() {},
  };

  assert.throws(() => {
    // eslint-disable-next-line no-new
    new UserService({ userRepository: invalidRepository });
  }, /USER_SERVICE.INVALID_REPOSITORY: missing createUser/);
});
