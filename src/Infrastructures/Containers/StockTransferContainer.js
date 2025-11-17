import PrismaStockTransferRepository from '../Repositories/PrismaStockTransferRepository.js';
import StockTransferService from '../../Applications/Stocks/Services/StockTransferService.js';
import { ListStockTransfersUsecase, GetStockTransferUsecase, CreateStockTransferUsecase, DeleteStockTransferUsecase } from '../../Applications/Stocks/UseCases/index.js';
import StockTransferPresenter from '../../Interfaces/Presenters/StockTransferPresenter.js';
import StockTransferController from '../../Interfaces/Controllers/StockTransferController.js';

export default function registerStockTransferContainer({ container, overrides = {}, prisma }) {
  const stockTransferRepository = overrides.stockTransferRepository ?? new PrismaStockTransferRepository({ prisma });
  const stockTransferService = overrides.stockTransferService ?? new StockTransferService({ stockTransferRepository });
  const listUsecase = overrides.listStockTransfersUsecase ?? new ListStockTransfersUsecase({ stockTransferService });
  const getUsecase = overrides.getStockTransferUsecase ?? new GetStockTransferUsecase({ stockTransferService });
  const createUsecase = overrides.createStockTransferUsecase ?? new CreateStockTransferUsecase({ stockTransferService });
  const deleteUsecase = overrides.deleteStockTransferUsecase ?? new DeleteStockTransferUsecase({ stockTransferService });
  const presenter = overrides.stockTransferPresenter ?? new StockTransferPresenter();
  const controller = overrides.stockTransferController ?? new StockTransferController({ presenter, listUsecase, getUsecase, createUsecase, deleteUsecase });

  container.set('stockTransferRepository', stockTransferRepository);
  container.set('stockTransferService', stockTransferService);
  container.set('listStockTransfersUsecase', listUsecase);
  container.set('getStockTransferUsecase', getUsecase);
  container.set('createStockTransferUsecase', createUsecase);
  container.set('deleteStockTransferUsecase', deleteUsecase);
  container.set('stockTransferPresenter', presenter);
  container.set('stockTransferController', controller);
}

