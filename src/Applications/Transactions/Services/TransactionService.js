import TransactionRepository from '../../../Domains/Transactions/Repositories/TransactionRepository.js';

export default class TransactionService {
  constructor({ transactionRepository } = {}) {
    if (!transactionRepository) throw new Error('TRANSACTION_SERVICE.MISSING_REPOSITORY');
    if (!(transactionRepository instanceof TransactionRepository)) {
      const req = ['findAll','findById','createTransaction','updateTransaction','deleteTransaction'];
      const miss = req.find((m) => typeof transactionRepository[m] !== 'function');
      if (miss) throw new Error(`TRANSACTION_SERVICE.INVALID_REPOSITORY: missing ${miss}`);
    }
    this._repo = transactionRepository;
  }

  listTransactions() { return this._repo.findAll(); }
  getTransaction(id) { return this._repo.findById(id); }
  createTransaction(data) { return this._repo.createTransaction(data); }
  updateTransaction({ id, data }) { return this._repo.updateTransaction({ id, data }); }
  deleteTransaction(id) { return this._repo.deleteTransaction(id); }
}

