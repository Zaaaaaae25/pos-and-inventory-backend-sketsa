import BaseTransactionUsecase from '../BaseTransactionUsecase.js';

export default class CreateKitchenOrderUsecase extends BaseTransactionUsecase {
  constructor({ kitchenOrderService } = {}) { super(); if (!kitchenOrderService) throw new Error('CREATE_KITCHEN_ORDER.MISSING_SERVICE'); this.kitchenOrderService = kitchenOrderService; }
  async execute(payload = {}) {
    this._ensureObject(payload);
    const data = { transactionItemId: this._positiveInt(payload.transactionItemId, 'transactionItemId') };
    if (payload.status !== undefined) data.status = payload.status == null ? null : String(payload.status).trim() || 'waiting';
    if (payload.startedAt !== undefined) data.startedAt = payload.startedAt ? new Date(payload.startedAt) : null;
    if (payload.finishedAt !== undefined) data.finishedAt = payload.finishedAt ? new Date(payload.finishedAt) : null;
    if (payload.note !== undefined) data.note = payload.note == null ? null : String(payload.note).trim() || null;
    return this.kitchenOrderService.createKitchenOrder(data);
  }
}

