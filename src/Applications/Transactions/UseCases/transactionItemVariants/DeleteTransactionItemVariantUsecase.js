import BaseTransactionUsecase from '../BaseTransactionUsecase.js';
import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class DeleteTransactionItemVariantUsecase extends BaseTransactionUsecase {
  constructor({ transactionItemVariantService } = {}) { super(); if (!transactionItemVariantService) throw new Error('DELETE_TRANSACTION_ITEM_VARIANT.MISSING_SERVICE'); this.transactionItemVariantService = transactionItemVariantService; }
  async execute(id) { const intId = this._positiveInt(id, 'id'); const ok = await this.transactionItemVariantService.deleteVariant(intId); if (!ok) throw new ValidationError('Transaction item variant not found'); return true; }
}

