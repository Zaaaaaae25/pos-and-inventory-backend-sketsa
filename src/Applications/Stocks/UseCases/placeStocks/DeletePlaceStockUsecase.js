import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class DeletePlaceStockUsecase {
  constructor({ placeStockService } = {}) { if (!placeStockService) throw new Error('DELETE_PLACESTOCK.MISSING_SERVICE'); this.placeStockService = placeStockService; }
  async execute(id){ const intId=Number(id); if(!Number.isInteger(intId)||intId<=0) throw new ValidationError('id must be positive integer'); const ok = await this.placeStockService.deletePlaceStock(intId); if(!ok) throw new ValidationError('Place stock not found'); return true; }
}

