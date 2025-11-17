export default class ListStockTransfersUsecase {
  constructor({ stockTransferService } = {}) { if (!stockTransferService) throw new Error('LIST_STOCK_TRANSFERS.MISSING_SERVICE'); this.stockTransferService = stockTransferService; }
  async execute() { return this.stockTransferService.list(); }
}

