import BaseTransactionUsecase from '../BaseTransactionUsecase.js';

export default class UpdateKitchenOrderUsecase extends BaseTransactionUsecase {
  constructor({ kitchenOrderService } = {}) { super(); if (!kitchenOrderService) throw new Error('UPDATE_KITCHEN_ORDER.MISSING_SERVICE'); this.kitchenOrderService = kitchenOrderService; }
  async execute(id, payload = {}) {
    const intId = this._positiveInt(id, 'id');
    this._ensureObject(payload);
    const data = {};
    if (payload.transactionItemId !== undefined) data.transactionItemId = this._positiveInt(payload.transactionItemId, 'transactionItemId');
    if (payload.status !== undefined) data.status = payload.status == null ? null : String(payload.status).trim() || 'waiting';
    if (payload.startedAt !== undefined) data.startedAt = payload.startedAt ? new Date(payload.startedAt) : null;
    if (payload.finishedAt !== undefined) data.finishedAt = payload.finishedAt ? new Date(payload.finishedAt) : null;
    if (payload.note !== undefined) data.note = payload.note == null ? null : String(payload.note).trim() || null;
    return this.kitchenOrderService.updateKitchenOrder({ id: intId, data });
  }
}

