import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class UpdatePlaceStockUsecase {
  constructor({ placeStockService } = {}) { if (!placeStockService) throw new Error('UPDATE_PLACESTOCK.MISSING_SERVICE'); this.placeStockService = placeStockService; }
  async execute(id, payload={}){
    const intId = Number(id); if(!Number.isInteger(intId)||intId<=0) throw new ValidationError('id must be positive integer');
    if(typeof payload !== 'object' || payload===null || Array.isArray(payload)) throw new ValidationError('Payload must be an object');
    const data = {};
    if(payload.placeId!==undefined) data.placeId = Number(payload.placeId);
    if(payload.ingredientId!==undefined) data.ingredientId = Number(payload.ingredientId);
    if(payload.qty!==undefined) data.qty = Number(payload.qty);
    if(payload.unitId!==undefined) data.unitId = Number(payload.unitId);
    return this.placeStockService.updatePlaceStock({ id: intId, data });
  }
}

