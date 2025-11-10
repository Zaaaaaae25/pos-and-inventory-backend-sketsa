import BaseTransactionUsecase from '../BaseTransactionUsecase.js';

export default class UpdateTransactionUsecase extends BaseTransactionUsecase {
  constructor({ transactionService } = {}) { super(); if (!transactionService) throw new Error('UPDATE_TRANSACTION.MISSING_SERVICE'); this.transactionService = transactionService; }
  async execute(id, payload = {}) {
    const intId = this._positiveInt(id, 'id');
    this._ensureObject(payload);
    const data = {};
    if (payload.cashierId != null) data.cashierId = this._positiveInt(payload.cashierId, 'cashierId');
    if (payload.placeId !== undefined) data.placeId = payload.placeId == null ? null : Number(payload.placeId);
    if (payload.tableId !== undefined) data.tableId = payload.tableId == null ? null : Number(payload.tableId);
    if (payload.orderType !== undefined) data.orderType = payload.orderType == null ? null : String(payload.orderType).trim() || null;
    if (payload.total !== undefined) data.total = Number(payload.total);
    if (payload.tax !== undefined) data.tax = payload.tax == null ? null : Number(payload.tax);
    if (payload.discount !== undefined) data.discount = payload.discount == null ? null : Number(payload.discount);
    if (payload.paymentMethodId !== undefined) data.paymentMethodId = payload.paymentMethodId == null ? null : this._positiveInt(payload.paymentMethodId, 'paymentMethodId');
    return this.transactionService.updateTransaction({ id: intId, data });
  }
}

