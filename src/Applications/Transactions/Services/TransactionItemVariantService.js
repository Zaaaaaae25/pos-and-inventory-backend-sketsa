import TransactionItemVariantRepository from '../../../Domains/Transactions/Repositories/TransactionItemVariantRepository.js';

export default class TransactionItemVariantService {
  constructor({ transactionItemVariantRepository } = {}) {
    if (!transactionItemVariantRepository) throw new Error('TRANSACTION_ITEM_VARIANT_SERVICE.MISSING_REPOSITORY');
    if (!(transactionItemVariantRepository instanceof TransactionItemVariantRepository)) {
      const req = ['findAll','findById','createVariant','deleteVariant'];
      const miss = req.find((m) => typeof transactionItemVariantRepository[m] !== 'function');
      if (miss) throw new Error(`TRANSACTION_ITEM_VARIANT_SERVICE.INVALID_REPOSITORY: missing ${miss}`);
    }
    this._repo = transactionItemVariantRepository;
  }

  listVariants() { return this._repo.findAll(); }
  getVariant(id) { return this._repo.findById(id); }
  createVariant(data) { return this._repo.createVariant(data); }
  deleteVariant(id) { return this._repo.deleteVariant(id); }
}

