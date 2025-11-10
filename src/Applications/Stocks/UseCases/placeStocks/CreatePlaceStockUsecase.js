import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class CreatePlaceStockUsecase {
  constructor({ placeStockService } = {}) { if (!placeStockService) throw new Error('CREATE_PLACESTOCK.MISSING_SERVICE'); this.placeStockService = placeStockService; }
  async execute(payload={}){
    if(typeof payload !== 'object' || payload===null || Array.isArray(payload)) throw new ValidationError('Payload must be an object');
    const data = {
      placeId: Number(payload.placeId),
      ingredientId: Number(payload.ingredientId),
      qty: Number(payload.qty ?? 0),
      unitId: Number(payload.unitId),
    };
    return this.placeStockService.createPlaceStock(data);
  }
}

