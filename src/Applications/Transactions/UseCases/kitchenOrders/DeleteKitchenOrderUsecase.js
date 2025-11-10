import BaseTransactionUsecase from '../BaseTransactionUsecase.js';
import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class DeleteKitchenOrderUsecase extends BaseTransactionUsecase {
  constructor({ kitchenOrderService } = {}) { super(); if (!kitchenOrderService) throw new Error('DELETE_KITCHEN_ORDER.MISSING_SERVICE'); this.kitchenOrderService = kitchenOrderService; }
  async execute(id) { const intId = this._positiveInt(id, 'id'); const ok = await this.kitchenOrderService.deleteKitchenOrder(intId); if (!ok) throw new ValidationError('Kitchen order not found'); return true; }
}

