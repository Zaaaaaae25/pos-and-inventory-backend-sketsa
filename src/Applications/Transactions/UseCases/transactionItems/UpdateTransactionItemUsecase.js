import BaseTransactionUsecase from '../BaseTransactionUsecase.js';

export default class UpdateTransactionItemUsecase extends BaseTransactionUsecase {
  constructor({ transactionItemService } = {}) { super(); if (!transactionItemService) throw new Error('UPDATE_TRANSACTION_ITEM.MISSING_SERVICE'); this.transactionItemService = transactionItemService; }
  async execute(id, payload = {}) {
    const intId = this._positiveInt(id, 'id');
    this._ensureObject(payload);
    const data = {};
    if (payload.transactionId !== undefined) data.transactionId = this._positiveInt(payload.transactionId, 'transactionId');
    if (payload.menuId !== undefined) data.menuId = this._positiveInt(payload.menuId, 'menuId');
    if (payload.qty !== undefined) data.qty = this._positiveInt(payload.qty, 'qty');
    if (payload.price !== undefined) data.price = Number(payload.price);
    if (payload.discount !== undefined) data.discount = payload.discount == null ? null : Number(payload.discount);
    return this.transactionItemService.updateItem({ id: intId, data });
  }
}

