import BaseTransactionUsecase from '../BaseTransactionUsecase.js';
import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class GetKitchenOrderUsecase extends BaseTransactionUsecase {
  constructor({ kitchenOrderService } = {}) { super(); if (!kitchenOrderService) throw new Error('GET_KITCHEN_ORDER.MISSING_SERVICE'); this.kitchenOrderService = kitchenOrderService; }
  async execute(id) { const intId = this._positiveInt(id, 'id'); const rec = await this.kitchenOrderService.getKitchenOrder(intId); if (!rec) throw new ValidationError('Kitchen order not found'); return rec; }
}

