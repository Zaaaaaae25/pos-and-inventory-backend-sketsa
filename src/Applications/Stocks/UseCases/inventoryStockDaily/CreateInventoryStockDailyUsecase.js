import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class CreateInventoryStockDailyUsecase {
  constructor({ inventoryStockDailyService } = {}) { if (!inventoryStockDailyService) throw new Error('CREATE_ISD.MISSING_SERVICE'); this.inventoryStockDailyService = inventoryStockDailyService; }
  async execute(payload={}){
    if(typeof payload !== 'object' || payload===null || Array.isArray(payload)) throw new ValidationError('Payload must be an object');
    const data = {
      placeId: Number(payload.placeId),
      ingredientId: Number(payload.ingredientId),
      date: payload.date ? new Date(payload.date) : new Date(),
      openingQty: Number(payload.openingQty ?? 0),
      closingQty: Number(payload.closingQty ?? 0),
      diffQty: payload.diffQty==null? null : Number(payload.diffQty),
    };
    return this.inventoryStockDailyService.create(data);
  }
}

