import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class GetInventoryStockDailyUsecase {
  constructor({ inventoryStockDailyService } = {}) { if (!inventoryStockDailyService) throw new Error('GET_ISD.MISSING_SERVICE'); this.inventoryStockDailyService = inventoryStockDailyService; }
  async execute(id){ const intId=Number(id); if(!Number.isInteger(intId)||intId<=0) throw new ValidationError('id must be positive integer'); const rec = await this.inventoryStockDailyService.get(intId); if(!rec) throw new ValidationError('Inventory stock daily not found'); return rec; }
}

