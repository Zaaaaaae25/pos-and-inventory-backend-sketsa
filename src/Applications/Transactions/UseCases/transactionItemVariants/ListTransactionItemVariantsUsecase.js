import BaseTransactionUsecase from '../BaseTransactionUsecase.js';

export default class ListTransactionItemVariantsUsecase extends BaseTransactionUsecase {
  constructor({ transactionItemVariantService } = {}) { super(); if (!transactionItemVariantService) throw new Error('LIST_TRANSACTION_ITEM_VARIANTS.MISSING_SERVICE'); this.transactionItemVariantService = transactionItemVariantService; }
  async execute() { return this.transactionItemVariantService.listVariants(); }
}

