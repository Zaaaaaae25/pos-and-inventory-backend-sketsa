import BaseTransactionUsecase from '../BaseTransactionUsecase.js';

export default class ListTransactionItemsUsecase extends BaseTransactionUsecase {
  constructor({ transactionItemService } = {}) { super(); if (!transactionItemService) throw new Error('LIST_TRANSACTION_ITEMS.MISSING_SERVICE'); this.transactionItemService = transactionItemService; }
  async execute() { return this.transactionItemService.listItems(); }
}

