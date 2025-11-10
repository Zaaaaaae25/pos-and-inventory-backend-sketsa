import BaseTransactionUsecase from '../BaseTransactionUsecase.js';
import ValidationError from '../../../../Commons/Errors/ValidationError.js';

export default class DeleteTransactionUsecase extends BaseTransactionUsecase {
  constructor({ transactionService } = {}) { super(); if (!transactionService) throw new Error('DELETE_TRANSACTION.MISSING_SERVICE'); this.transactionService = transactionService; }
  async execute(id) { const intId = this._positiveInt(id, 'id'); const ok = await this.transactionService.deleteTransaction(intId); if (!ok) throw new ValidationError('Transaction not found'); return true; }
}

