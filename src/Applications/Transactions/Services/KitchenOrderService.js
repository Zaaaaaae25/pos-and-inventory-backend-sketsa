import KitchenOrderRepository from '../../../Domains/Transactions/Repositories/KitchenOrderRepository.js';

export default class KitchenOrderService {
  constructor({ kitchenOrderRepository } = {}) {
    if (!kitchenOrderRepository) throw new Error('KITCHEN_ORDER_SERVICE.MISSING_REPOSITORY');
    if (!(kitchenOrderRepository instanceof KitchenOrderRepository)) {
      const req = ['findAll','findById','createKitchenOrder','updateKitchenOrder','deleteKitchenOrder'];
      const miss = req.find((m) => typeof kitchenOrderRepository[m] !== 'function');
      if (miss) throw new Error(`KITCHEN_ORDER_SERVICE.INVALID_REPOSITORY: missing ${miss}`);
    }
    this._repo = kitchenOrderRepository;
  }

  listKitchenOrders() { return this._repo.findAll(); }
  getKitchenOrder(id) { return this._repo.findById(id); }
  createKitchenOrder(data) { return this._repo.createKitchenOrder(data); }
  updateKitchenOrder({ id, data }) { return this._repo.updateKitchenOrder({ id, data }); }
  deleteKitchenOrder(id) { return this._repo.deleteKitchenOrder(id); }
}

