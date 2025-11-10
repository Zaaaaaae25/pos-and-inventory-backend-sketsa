import BaseTransactionUsecase from '../BaseTransactionUsecase.js';

export default class ListKitchenOrdersUsecase extends BaseTransactionUsecase {
  constructor({ kitchenOrderService } = {}) { super(); if (!kitchenOrderService) throw new Error('LIST_KITCHEN_ORDERS.MISSING_SERVICE'); this.kitchenOrderService = kitchenOrderService; }
  async execute() { return this.kitchenOrderService.listKitchenOrders(); }
}

