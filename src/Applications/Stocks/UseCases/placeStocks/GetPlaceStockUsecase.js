import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class GetPlaceStockUsecase {
  constructor({ placeStockService } = {}) { if (!placeStockService) throw new Error('GET_PLACESTOCK.MISSING_SERVICE'); this.placeStockService = placeStockService; }
  async execute(id){ const intId=Number(id); if(!Number.isInteger(intId)||intId<=0) throw new ValidationError('id must be positive integer'); const rec = await this.placeStockService.getPlaceStock(intId); if(!rec) throw new ValidationError('Place stock not found'); return rec; }
}

