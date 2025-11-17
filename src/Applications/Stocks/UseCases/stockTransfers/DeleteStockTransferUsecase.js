import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class DeleteStockTransferUsecase {
  constructor({ stockTransferService } = {}) { if (!stockTransferService) throw new Error('DELETE_STOCK_TRANSFER.MISSING_SERVICE'); this.stockTransferService = stockTransferService; }
  async execute(id) { const intId = Number(id); if (!Number.isInteger(intId) || intId <= 0) throw new ValidationError('id must be positive integer'); const ok = await this.stockTransferService.delete(intId); if (!ok) throw new ValidationError('Stock transfer not found'); return true; }
}

