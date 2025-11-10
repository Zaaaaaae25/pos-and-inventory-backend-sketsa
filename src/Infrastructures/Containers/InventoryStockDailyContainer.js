import PrismaInventoryStockDailyRepository from '../Repositories/PrismaInventoryStockDailyRepository.js';
import InventoryStockDailyService from '../../Applications/Stocks/Services/InventoryStockDailyService.js';
import { ListInventoryStockDailyUsecase, GetInventoryStockDailyUsecase, CreateInventoryStockDailyUsecase, UpdateInventoryStockDailyUsecase, DeleteInventoryStockDailyUsecase } from '../../Applications/Stocks/UseCases/index.js';
import InventoryStockDailyPresenter from '../../Interfaces/Presenters/InventoryStockDailyPresenter.js';
import InventoryStockDailyController from '../../Interfaces/Controllers/InventoryStockDailyController.js';

export default function registerInventoryStockDailyContainer({ container, overrides = {}, prisma }) {
  const repository = overrides.inventoryStockDailyRepository ?? new PrismaInventoryStockDailyRepository({ prisma });
  const service = overrides.inventoryStockDailyService ?? new InventoryStockDailyService({ inventoryStockDailyRepository: repository });
  const listUsecase = overrides.listInventoryStockDailyUsecase ?? new ListInventoryStockDailyUsecase({ inventoryStockDailyService: service });
  const getUsecase = overrides.getInventoryStockDailyUsecase ?? new GetInventoryStockDailyUsecase({ inventoryStockDailyService: service });
  const createUsecase = overrides.createInventoryStockDailyUsecase ?? new CreateInventoryStockDailyUsecase({ inventoryStockDailyService: service });
  const updateUsecase = overrides.updateInventoryStockDailyUsecase ?? new UpdateInventoryStockDailyUsecase({ inventoryStockDailyService: service });
  const deleteUsecase = overrides.deleteInventoryStockDailyUsecase ?? new DeleteInventoryStockDailyUsecase({ inventoryStockDailyService: service });
  const presenter = overrides.inventoryStockDailyPresenter ?? new InventoryStockDailyPresenter();
  const controller = overrides.inventoryStockDailyController ?? new InventoryStockDailyController({ presenter, listUsecase, getUsecase, createUsecase, updateUsecase, deleteUsecase });

  container.set('inventoryStockDailyRepository', repository);
  container.set('inventoryStockDailyService', service);
  container.set('listInventoryStockDailyUsecase', listUsecase);
  container.set('getInventoryStockDailyUsecase', getUsecase);
  container.set('createInventoryStockDailyUsecase', createUsecase);
  container.set('updateInventoryStockDailyUsecase', updateUsecase);
  container.set('deleteInventoryStockDailyUsecase', deleteUsecase);
  container.set('inventoryStockDailyPresenter', presenter);
  container.set('inventoryStockDailyController', controller);
}

