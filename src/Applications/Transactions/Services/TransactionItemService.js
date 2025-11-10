import TransactionItemRepository from '../../../Domains/Transactions/Repositories/TransactionItemRepository.js';

export default class TransactionItemService {
  constructor({ transactionItemRepository } = {}) {
    if (!transactionItemRepository) throw new Error('TRANSACTION_ITEM_SERVICE.MISSING_REPOSITORY');
    if (!(transactionItemRepository instanceof TransactionItemRepository)) {
      const req = ['findAll','findById','createItem','updateItem','deleteItem'];
      const miss = req.find((m) => typeof transactionItemRepository[m] !== 'function');
      if (miss) throw new Error(`TRANSACTION_ITEM_SERVICE.INVALID_REPOSITORY: missing ${miss}`);
    }
    this._repo = transactionItemRepository;
  }

  listItems() { return this._repo.findAll(); }
  getItem(id) { return this._repo.findById(id); }
  createItem(data) { return this._repo.createItem(data); }
  updateItem({ id, data }) { return this._repo.updateItem({ id, data }); }
  deleteItem(id) { return this._repo.deleteItem(id); }
}

