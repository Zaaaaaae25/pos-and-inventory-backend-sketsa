import BaseTransactionUsecase from '../BaseTransactionUsecase.js';
import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class DeleteTransactionItemUsecase extends BaseTransactionUsecase {
  constructor({ transactionItemService } = {}) { super(); if (!transactionItemService) throw new Error('DELETE_TRANSACTION_ITEM.MISSING_SERVICE'); this.transactionItemService = transactionItemService; }
  async execute(id) { const intId = this._positiveInt(id, 'id'); const ok = await this.transactionItemService.deleteItem(intId); if (!ok) throw new ValidationError('Transaction item not found'); return true; }
}

