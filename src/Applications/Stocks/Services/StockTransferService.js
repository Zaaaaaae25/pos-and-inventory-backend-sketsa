import StockTransferRepository from '../../../Domains/Stocks/Repositories/StockTransferRepository.js';

export default class StockTransferService {
  constructor({ stockTransferRepository } = {}) {
    if (!stockTransferRepository) throw new Error('STOCK_TRANSFER_SERVICE.MISSING_REPOSITORY');
    if (!(stockTransferRepository instanceof StockTransferRepository)) {
      const req = ['findAll','findById','createTransfer','deleteTransfer'];
      const miss = req.find((m) => typeof stockTransferRepository[m] !== 'function');
      if (miss) throw new Error(`STOCK_TRANSFER_SERVICE.INVALID_REPOSITORY: missing ${miss}`);
    }
    this._repo = stockTransferRepository;
  }
  list() { return this._repo.findAll(); }
  get(id) { return this._repo.findById(id); }
  create(data) { return this._repo.createTransfer(data); }
  delete(id) { return this._repo.deleteTransfer(id); }
}

