import test from 'node:test';
import assert from 'node:assert/strict';

import OutletService from '../OutletService.js';

class DummyOutletRepository {
  constructor() {
    this._calls = {
      findAll: [],
      findById: [],
      createOutlet: [],
      updateOutlet: [],
      deleteOutlet: [],
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

  async createOutlet(payload) {
    this._calls.createOutlet.push(payload);
    return { id: 1, ...payload.outletData };
  }

  async updateOutlet(payload) {
    this._calls.updateOutlet.push(payload);
    return { id: payload.id, ...payload.outletData };
  }

  async deleteOutlet(id) {
    this._calls.deleteOutlet.push(id);
    return true;
  }
}

test('OutletService delegates repository calls', async () => {
  const repository = new DummyOutletRepository();
  const service = new OutletService({ outletRepository: repository });

  const outlets = await service.listOutlets();
  assert.deepEqual(outlets, [{ id: 1 }]);
  assert.equal(repository._calls.findAll.length, 1);

  const outlet = await service.getOutlet(2);
  assert.equal(outlet.id, 2);
  assert.deepEqual(repository._calls.findById, [2]);

  await service.createOutlet({ outletData: { name: 'Outlet' } });
  assert.equal(repository._calls.createOutlet.length, 1);

  await service.updateOutlet({ id: 1, outletData: { name: 'Updated' } });
  assert.equal(repository._calls.updateOutlet.length, 1);

  await service.deleteOutlet(1);
  assert.deepEqual(repository._calls.deleteOutlet, [1]);
});

test('OutletService requires repository', () => {
  assert.throws(() => new OutletService(), /OUTLET_SERVICE.MISSING_REPOSITORY/);
});

test('OutletService validates repository shape', () => {
  assert.throws(
    () =>
      new OutletService({
        outletRepository: {
          findAll() {},
        },
      }),
    /OUTLET_SERVICE.INVALID_REPOSITORY/
  );
});
