import BaseTransactionUsecase from '../BaseTransactionUsecase.js';
import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class GetTransactionItemUsecase extends BaseTransactionUsecase {
  constructor({ transactionItemService } = {}) { super(); if (!transactionItemService) throw new Error('GET_TRANSACTION_ITEM.MISSING_SERVICE'); this.transactionItemService = transactionItemService; }
  async execute(id) { const intId = this._positiveInt(id, 'id'); const rec = await this.transactionItemService.getItem(intId); if (!rec) throw new ValidationError('Transaction item not found'); return rec; }
}

