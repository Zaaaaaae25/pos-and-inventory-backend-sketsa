import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class UpdateInventoryStockDailyUsecase {
  constructor({ inventoryStockDailyService } = {}) { if (!inventoryStockDailyService) throw new Error('UPDATE_ISD.MISSING_SERVICE'); this.inventoryStockDailyService = inventoryStockDailyService; }
  async execute(id, payload={}){
    const intId=Number(id); if(!Number.isInteger(intId)||intId<=0) throw new ValidationError('id must be positive integer');
    if(typeof payload !== 'object' || payload===null || Array.isArray(payload)) throw new ValidationError('Payload must be an object');
    const data = {};
    if(payload.placeId!==undefined) data.placeId = Number(payload.placeId);
    if(payload.ingredientId!==undefined) data.ingredientId = Number(payload.ingredientId);
    if(payload.date!==undefined) data.date = payload.date ? new Date(payload.date) : null;
    if(payload.openingQty!==undefined) data.openingQty = Number(payload.openingQty);
    if(payload.closingQty!==undefined) data.closingQty = Number(payload.closingQty);
    if(payload.diffQty!==undefined) data.diffQty = payload.diffQty==null? null : Number(payload.diffQty);
    return this.inventoryStockDailyService.update({ id: intId, data });
  }
}

