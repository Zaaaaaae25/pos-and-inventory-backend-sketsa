import BaseTransactionUsecase from '../BaseTransactionUsecase.js';

export default class CreateTransactionItemVariantUsecase extends BaseTransactionUsecase {
  constructor({ transactionItemVariantService } = {}) { super(); if (!transactionItemVariantService) throw new Error('CREATE_TRANSACTION_ITEM_VARIANT.MISSING_SERVICE'); this.transactionItemVariantService = transactionItemVariantService; }
  async execute(payload = {}) {
    this._ensureObject(payload);
    const data = {
      transactionItemId: this._positiveInt(payload.transactionItemId, 'transactionItemId'),
      menuVariantId: this._positiveInt(payload.menuVariantId, 'menuVariantId'),
    };
    if (payload.extraPrice !== undefined) data.extraPrice = Number(payload.extraPrice);
    return this.transactionItemVariantService.createVariant(data);
  }
}

