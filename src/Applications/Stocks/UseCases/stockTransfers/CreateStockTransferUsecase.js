import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class CreateStockTransferUsecase {
  constructor({ stockTransferService } = {}) { if (!stockTransferService) throw new Error('CREATE_STOCK_TRANSFER.MISSING_SERVICE'); this.stockTransferService = stockTransferService; }
  async execute(payload = {}) {
    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) throw new ValidationError('Payload must be an object');
    const data = { ingredientId: Number(payload.ingredientId), qty: Number(payload.qty) };
    if (payload.fromPlaceId !== undefined) data.fromPlaceId = payload.fromPlaceId == null ? null : Number(payload.fromPlaceId);
    if (payload.toPlaceId !== undefined) data.toPlaceId = payload.toPlaceId == null ? null : Number(payload.toPlaceId);
    return this.stockTransferService.create(data);
  }
}

