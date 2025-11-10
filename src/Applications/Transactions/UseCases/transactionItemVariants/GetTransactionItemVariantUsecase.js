import BaseTransactionUsecase from '../BaseTransactionUsecase.js';
import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class GetTransactionItemVariantUsecase extends BaseTransactionUsecase {
  constructor({ transactionItemVariantService } = {}) { super(); if (!transactionItemVariantService) throw new Error('GET_TRANSACTION_ITEM_VARIANT.MISSING_SERVICE'); this.transactionItemVariantService = transactionItemVariantService; }
  async execute(id) { const intId = this._positiveInt(id, 'id'); const rec = await this.transactionItemVariantService.getVariant(intId); if (!rec) throw new ValidationError('Transaction item variant not found'); return rec; }
}

