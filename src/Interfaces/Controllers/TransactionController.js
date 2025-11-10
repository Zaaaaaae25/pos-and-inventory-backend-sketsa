import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class TransactionController {
  constructor(deps = {}) {
    const required = [
      // presenters
      ['transactionPresenter', deps.transactionPresenter],
      ['transactionItemPresenter', deps.transactionItemPresenter],
      ['transactionItemVariantPresenter', deps.transactionItemVariantPresenter],
      ['kitchenOrderPresenter', deps.kitchenOrderPresenter],
      // transaction usecases
      ['listTransactionsUsecase', deps.listTransactionsUsecase],
      ['getTransactionUsecase', deps.getTransactionUsecase],
      ['createTransactionUsecase', deps.createTransactionUsecase],
      ['updateTransactionUsecase', deps.updateTransactionUsecase],
      ['deleteTransactionUsecase', deps.deleteTransactionUsecase],
      // items
      ['listTransactionItemsUsecase', deps.listTransactionItemsUsecase],
      ['getTransactionItemUsecase', deps.getTransactionItemUsecase],
      ['createTransactionItemUsecase', deps.createTransactionItemUsecase],
      ['updateTransactionItemUsecase', deps.updateTransactionItemUsecase],
      ['deleteTransactionItemUsecase', deps.deleteTransactionItemUsecase],
      // item variants
      ['listTransactionItemVariantsUsecase', deps.listTransactionItemVariantsUsecase],
      ['getTransactionItemVariantUsecase', deps.getTransactionItemVariantUsecase],
      ['createTransactionItemVariantUsecase', deps.createTransactionItemVariantUsecase],
      ['deleteTransactionItemVariantUsecase', deps.deleteTransactionItemVariantUsecase],
      // kitchen orders
      ['listKitchenOrdersUsecase', deps.listKitchenOrdersUsecase],
      ['getKitchenOrderUsecase', deps.getKitchenOrderUsecase],
      ['createKitchenOrderUsecase', deps.createKitchenOrderUsecase],
      ['updateKitchenOrderUsecase', deps.updateKitchenOrderUsecase],
      ['deleteKitchenOrderUsecase', deps.deleteKitchenOrderUsecase],
    ];
    const miss = required.find(([, v]) => !v);
    if (miss) throw new Error(`TransactionController requires ${miss[0]}`);

    Object.assign(this, Object.fromEntries(required));
  }

  // Transactions
  async listTransactions() { const records = await this.listTransactionsUsecase.execute(); return { status: HttpStatus.OK, data: this.transactionPresenter.presentCollection(records) }; }
  async getTransaction({ params }) { const rec = await this.getTransactionUsecase.execute(params.id); return { status: HttpStatus.OK, data: this.transactionPresenter.present(rec) }; }
  async createTransaction({ body }) { const rec = await this.createTransactionUsecase.execute(body); return { status: HttpStatus.CREATED, data: this.transactionPresenter.present(rec) }; }
  async updateTransaction({ params, body }) { const rec = await this.updateTransactionUsecase.execute(params.id, body); return { status: HttpStatus.OK, data: this.transactionPresenter.present(rec) }; }
  async deleteTransaction({ params }) { await this.deleteTransactionUsecase.execute(params.id); return { status: HttpStatus.NO_CONTENT }; }

  // Items
  async listTransactionItems() { const records = await this.listTransactionItemsUsecase.execute(); return { status: HttpStatus.OK, data: this.transactionItemPresenter.presentCollection(records) }; }
  async getTransactionItem({ params }) { const rec = await this.getTransactionItemUsecase.execute(params.id); return { status: HttpStatus.OK, data: this.transactionItemPresenter.present(rec) }; }
  async createTransactionItem({ body }) { const rec = await this.createTransactionItemUsecase.execute(body); return { status: HttpStatus.CREATED, data: this.transactionItemPresenter.present(rec) }; }
  async updateTransactionItem({ params, body }) { const rec = await this.updateTransactionItemUsecase.execute(params.id, body); return { status: HttpStatus.OK, data: this.transactionItemPresenter.present(rec) }; }
  async deleteTransactionItem({ params }) { await this.deleteTransactionItemUsecase.execute(params.id); return { status: HttpStatus.NO_CONTENT }; }

  // Item variants
  async listTransactionItemVariants() { const records = await this.listTransactionItemVariantsUsecase.execute(); return { status: HttpStatus.OK, data: this.transactionItemVariantPresenter.presentCollection(records) }; }
  async getTransactionItemVariant({ params }) { const rec = await this.getTransactionItemVariantUsecase.execute(params.id); return { status: HttpStatus.OK, data: this.transactionItemVariantPresenter.present(rec) }; }
  async createTransactionItemVariant({ body }) { const rec = await this.createTransactionItemVariantUsecase.execute(body); return { status: HttpStatus.CREATED, data: this.transactionItemVariantPresenter.present(rec) }; }
  async deleteTransactionItemVariant({ params }) { await this.deleteTransactionItemVariantUsecase.execute(params.id); return { status: HttpStatus.NO_CONTENT }; }

  // Kitchen orders
  async listKitchenOrders() { const records = await this.listKitchenOrdersUsecase.execute(); return { status: HttpStatus.OK, data: this.kitchenOrderPresenter.presentCollection(records) }; }
  async getKitchenOrder({ params }) { const rec = await this.getKitchenOrderUsecase.execute(params.id); return { status: HttpStatus.OK, data: this.kitchenOrderPresenter.present(rec) }; }
  async createKitchenOrder({ body }) { const rec = await this.createKitchenOrderUsecase.execute(body); return { status: HttpStatus.CREATED, data: this.kitchenOrderPresenter.present(rec) }; }
  async updateKitchenOrder({ params, body }) { const rec = await this.updateKitchenOrderUsecase.execute(params.id, body); return { status: HttpStatus.OK, data: this.kitchenOrderPresenter.present(rec) }; }
  async deleteKitchenOrder({ params }) { await this.deleteKitchenOrderUsecase.execute(params.id); return { status: HttpStatus.NO_CONTENT }; }
}
