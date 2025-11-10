import PrismaTransactionRepository from '../Repositories/PrismaTransactionRepository.js';
import PrismaTransactionItemRepository from '../Repositories/PrismaTransactionItemRepository.js';
import PrismaTransactionItemVariantRepository from '../Repositories/PrismaTransactionItemVariantRepository.js';
import PrismaKitchenOrderRepository from '../Repositories/PrismaKitchenOrderRepository.js';

import TransactionService from '../../Applications/Transactions/Services/TransactionService.js';
import TransactionItemService from '../../Applications/Transactions/Services/TransactionItemService.js';
import TransactionItemVariantService from '../../Applications/Transactions/Services/TransactionItemVariantService.js';
import KitchenOrderService from '../../Applications/Transactions/Services/KitchenOrderService.js';

import {
  ListTransactionsUsecase,
  GetTransactionUsecase,
  CreateTransactionUsecase,
  UpdateTransactionUsecase,
  DeleteTransactionUsecase,
  ListTransactionItemsUsecase,
  GetTransactionItemUsecase,
  CreateTransactionItemUsecase,
  UpdateTransactionItemUsecase,
  DeleteTransactionItemUsecase,
  ListTransactionItemVariantsUsecase,
  GetTransactionItemVariantUsecase,
  CreateTransactionItemVariantUsecase,
  DeleteTransactionItemVariantUsecase,
  ListKitchenOrdersUsecase,
  GetKitchenOrderUsecase,
  CreateKitchenOrderUsecase,
  UpdateKitchenOrderUsecase,
  DeleteKitchenOrderUsecase,
} from '../../Applications/Transactions/UseCases/index.js';

import TransactionPresenter from '../../Interfaces/Presenters/TransactionPresenter.js';
import TransactionItemPresenter from '../../Interfaces/Presenters/TransactionItemPresenter.js';
import TransactionItemVariantPresenter from '../../Interfaces/Presenters/TransactionItemVariantPresenter.js';
import KitchenOrderPresenter from '../../Interfaces/Presenters/KitchenOrderPresenter.js';
import TransactionController from '../../Interfaces/Controllers/TransactionController.js';

export default function registerTransactionContainer({ container, overrides = {}, prisma }) {
  const transactionRepository = overrides.transactionRepository ?? new PrismaTransactionRepository({ prisma });
  const transactionItemRepository = overrides.transactionItemRepository ?? new PrismaTransactionItemRepository({ prisma });
  const transactionItemVariantRepository = overrides.transactionItemVariantRepository ?? new PrismaTransactionItemVariantRepository({ prisma });
  const kitchenOrderRepository = overrides.kitchenOrderRepository ?? new PrismaKitchenOrderRepository({ prisma });

  const transactionService = overrides.transactionService ?? new TransactionService({ transactionRepository });
  const transactionItemService = overrides.transactionItemService ?? new TransactionItemService({ transactionItemRepository });
  const transactionItemVariantService = overrides.transactionItemVariantService ?? new TransactionItemVariantService({ transactionItemVariantRepository });
  const kitchenOrderService = overrides.kitchenOrderService ?? new KitchenOrderService({ kitchenOrderRepository });

  const listTransactionsUsecase = overrides.listTransactionsUsecase ?? new ListTransactionsUsecase({ transactionService });
  const getTransactionUsecase = overrides.getTransactionUsecase ?? new GetTransactionUsecase({ transactionService });
  const createTransactionUsecase = overrides.createTransactionUsecase ?? new CreateTransactionUsecase({ transactionService });
  const updateTransactionUsecase = overrides.updateTransactionUsecase ?? new UpdateTransactionUsecase({ transactionService });
  const deleteTransactionUsecase = overrides.deleteTransactionUsecase ?? new DeleteTransactionUsecase({ transactionService });

  const listTransactionItemsUsecase = overrides.listTransactionItemsUsecase ?? new ListTransactionItemsUsecase({ transactionItemService });
  const getTransactionItemUsecase = overrides.getTransactionItemUsecase ?? new GetTransactionItemUsecase({ transactionItemService });
  const createTransactionItemUsecase = overrides.createTransactionItemUsecase ?? new CreateTransactionItemUsecase({ transactionItemService });
  const updateTransactionItemUsecase = overrides.updateTransactionItemUsecase ?? new UpdateTransactionItemUsecase({ transactionItemService });
  const deleteTransactionItemUsecase = overrides.deleteTransactionItemUsecase ?? new DeleteTransactionItemUsecase({ transactionItemService });

  const listTransactionItemVariantsUsecase = overrides.listTransactionItemVariantsUsecase ?? new ListTransactionItemVariantsUsecase({ transactionItemVariantService });
  const getTransactionItemVariantUsecase = overrides.getTransactionItemVariantUsecase ?? new GetTransactionItemVariantUsecase({ transactionItemVariantService });
  const createTransactionItemVariantUsecase = overrides.createTransactionItemVariantUsecase ?? new CreateTransactionItemVariantUsecase({ transactionItemVariantService });
  const deleteTransactionItemVariantUsecase = overrides.deleteTransactionItemVariantUsecase ?? new DeleteTransactionItemVariantUsecase({ transactionItemVariantService });

  const listKitchenOrdersUsecase = overrides.listKitchenOrdersUsecase ?? new ListKitchenOrdersUsecase({ kitchenOrderService });
  const getKitchenOrderUsecase = overrides.getKitchenOrderUsecase ?? new GetKitchenOrderUsecase({ kitchenOrderService });
  const createKitchenOrderUsecase = overrides.createKitchenOrderUsecase ?? new CreateKitchenOrderUsecase({ kitchenOrderService });
  const updateKitchenOrderUsecase = overrides.updateKitchenOrderUsecase ?? new UpdateKitchenOrderUsecase({ kitchenOrderService });
  const deleteKitchenOrderUsecase = overrides.deleteKitchenOrderUsecase ?? new DeleteKitchenOrderUsecase({ kitchenOrderService });

  const transactionPresenter = overrides.transactionPresenter ?? new TransactionPresenter();
  const transactionItemPresenter = overrides.transactionItemPresenter ?? new TransactionItemPresenter();
  const transactionItemVariantPresenter = overrides.transactionItemVariantPresenter ?? new TransactionItemVariantPresenter();
  const kitchenOrderPresenter = overrides.kitchenOrderPresenter ?? new KitchenOrderPresenter();

  const transactionController = overrides.transactionController ?? new TransactionController({
    transactionPresenter,
    transactionItemPresenter,
    transactionItemVariantPresenter,
    kitchenOrderPresenter,
    listTransactionsUsecase,
    getTransactionUsecase,
    createTransactionUsecase,
    updateTransactionUsecase,
    deleteTransactionUsecase,
    listTransactionItemsUsecase,
    getTransactionItemUsecase,
    createTransactionItemUsecase,
    updateTransactionItemUsecase,
    deleteTransactionItemUsecase,
    listTransactionItemVariantsUsecase,
    getTransactionItemVariantUsecase,
    createTransactionItemVariantUsecase,
    deleteTransactionItemVariantUsecase,
    listKitchenOrdersUsecase,
    getKitchenOrderUsecase,
    createKitchenOrderUsecase,
    updateKitchenOrderUsecase,
    deleteKitchenOrderUsecase,
  });

  container.set('transactionRepository', transactionRepository);
  container.set('transactionItemRepository', transactionItemRepository);
  container.set('transactionItemVariantRepository', transactionItemVariantRepository);
  container.set('kitchenOrderRepository', kitchenOrderRepository);
  container.set('transactionService', transactionService);
  container.set('transactionItemService', transactionItemService);
  container.set('transactionItemVariantService', transactionItemVariantService);
  container.set('kitchenOrderService', kitchenOrderService);

  container.set('listTransactionsUsecase', listTransactionsUsecase);
  container.set('getTransactionUsecase', getTransactionUsecase);
  container.set('createTransactionUsecase', createTransactionUsecase);
  container.set('updateTransactionUsecase', updateTransactionUsecase);
  container.set('deleteTransactionUsecase', deleteTransactionUsecase);

  container.set('listTransactionItemsUsecase', listTransactionItemsUsecase);
  container.set('getTransactionItemUsecase', getTransactionItemUsecase);
  container.set('createTransactionItemUsecase', createTransactionItemUsecase);
  container.set('updateTransactionItemUsecase', updateTransactionItemUsecase);
  container.set('deleteTransactionItemUsecase', deleteTransactionItemUsecase);

  container.set('listTransactionItemVariantsUsecase', listTransactionItemVariantsUsecase);
  container.set('getTransactionItemVariantUsecase', getTransactionItemVariantUsecase);
  container.set('createTransactionItemVariantUsecase', createTransactionItemVariantUsecase);
  container.set('deleteTransactionItemVariantUsecase', deleteTransactionItemVariantUsecase);

  container.set('listKitchenOrdersUsecase', listKitchenOrdersUsecase);
  container.set('getKitchenOrderUsecase', getKitchenOrderUsecase);
  container.set('createKitchenOrderUsecase', createKitchenOrderUsecase);
  container.set('updateKitchenOrderUsecase', updateKitchenOrderUsecase);
  container.set('deleteKitchenOrderUsecase', deleteKitchenOrderUsecase);

  container.set('transactionPresenter', transactionPresenter);
  container.set('transactionItemPresenter', transactionItemPresenter);
  container.set('transactionItemVariantPresenter', transactionItemVariantPresenter);
  container.set('kitchenOrderPresenter', kitchenOrderPresenter);
  container.set('transactionController', transactionController);
}

