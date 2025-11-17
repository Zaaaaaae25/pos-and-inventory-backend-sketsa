import PrismaWasteRepository from '../Repositories/PrismaWasteRepository.js';
import WasteService from '../../Applications/Stocks/Services/WasteService.js';
import ListWastesUsecase from '../../Applications/Stocks/UseCases/wastes/ListWastesUsecase.js';
import GetWasteUsecase from '../../Applications/Stocks/UseCases/wastes/GetWasteUsecase.js';
import CreateWasteUsecase from '../../Applications/Stocks/UseCases/wastes/CreateWasteUsecase.js';
import UpdateWasteUsecase from '../../Applications/Stocks/UseCases/wastes/UpdateWasteUsecase.js';
import DeleteWasteUsecase from '../../Applications/Stocks/UseCases/wastes/DeleteWasteUsecase.js';
import WastePresenter from '../../Interfaces/Presenters/WastePresenter.js';
import WasteController from '../../Interfaces/Controllers/WasteController.js';

export default function registerWasteContainer({ container, overrides = {}, prisma }) {
  const repository = overrides.wasteRepository ?? new PrismaWasteRepository({ prisma });
  const service = overrides.wasteService ?? new WasteService({ wasteRepository: repository });
  const listUsecase = overrides.listWastesUsecase ?? new ListWastesUsecase({ wasteService: service });
  const getUsecase = overrides.getWasteUsecase ?? new GetWasteUsecase({ wasteService: service });
  const createUsecase = overrides.createWasteUsecase ?? new CreateWasteUsecase({ wasteService: service });
  const updateUsecase = overrides.updateWasteUsecase ?? new UpdateWasteUsecase({ wasteService: service });
  const deleteUsecase = overrides.deleteWasteUsecase ?? new DeleteWasteUsecase({ wasteService: service });
  const presenter = overrides.wastePresenter ?? new WastePresenter();
  const controller = overrides.wasteController ?? new WasteController({ presenter, listUsecase, getUsecase, createUsecase, updateUsecase, deleteUsecase });

  container.set('wasteRepository', repository);
  container.set('wasteService', service);
  container.set('listWastesUsecase', listUsecase);
  container.set('getWasteUsecase', getUsecase);
  container.set('createWasteUsecase', createUsecase);
  container.set('updateWasteUsecase', updateUsecase);
  container.set('deleteWasteUsecase', deleteUsecase);
  container.set('wastePresenter', presenter);
  container.set('wasteController', controller);
}
