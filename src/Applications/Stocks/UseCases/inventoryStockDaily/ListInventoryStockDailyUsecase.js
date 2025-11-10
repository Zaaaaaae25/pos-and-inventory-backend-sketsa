export default class ListInventoryStockDailyUsecase {
  constructor({ inventoryStockDailyService } = {}) { if (!inventoryStockDailyService) throw new Error('LIST_ISD.MISSING_SERVICE'); this.inventoryStockDailyService = inventoryStockDailyService; }
  async execute(){ return this.inventoryStockDailyService.list(); }
}

