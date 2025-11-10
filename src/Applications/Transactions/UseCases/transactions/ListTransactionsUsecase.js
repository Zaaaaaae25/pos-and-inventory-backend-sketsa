import BaseTransactionUsecase from '../BaseTransactionUsecase.js';

export default class ListTransactionsUsecase extends BaseTransactionUsecase {
  constructor({ transactionService } = {}) { super(); if (!transactionService) throw new Error('LIST_TRANSACTIONS.MISSING_SERVICE'); this.transactionService = transactionService; }
  async execute() { return this.transactionService.listTransactions(); }
}

