import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class DeleteInventoryStockDailyUsecase {
  constructor({ inventoryStockDailyService } = {}) { if (!inventoryStockDailyService) throw new Error('DELETE_ISD.MISSING_SERVICE'); this.inventoryStockDailyService = inventoryStockDailyService; }
  async execute(id){ const intId=Number(id); if(!Number.isInteger(intId)||intId<=0) throw new ValidationError('id must be positive integer'); const ok = await this.inventoryStockDailyService.delete(intId); if(!ok) throw new ValidationError('Inventory stock daily not found'); return true; }
}

