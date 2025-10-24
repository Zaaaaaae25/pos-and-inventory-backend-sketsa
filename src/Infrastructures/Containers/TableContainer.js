import PrismaTableRepository from '../Repositories/PrismaTableRepository.js';
import TableService from '../../Applications/Tables/Services/TableService.js';
import {
  ListTablesUsecase,
  GetTableUsecase,
  CreateTableUsecase,
  UpdateTableUsecase,
  DeleteTableUsecase,
} from '../../Applications/Tables/UseCases/index.js';
import TablePresenter from '../../Interfaces/Presenters/TablePresenter.js';
import TableController from '../../Interfaces/Controllers/TableController.js';
import PlaceService from '../../Applications/Places/Services/PlaceService.js';
import PrismaPlaceRepository from '../Repositories/PrismaPlaceRepository.js';

export default function registerTableContainer({ container, overrides = {}, prisma }) {
  const tableRepository = overrides.tableRepository ?? new PrismaTableRepository({ prisma });
  const tableService = overrides.tableService ?? new TableService({ tableRepository });

  let placeService = overrides.placeService ?? (container?.has('placeService') ? container.get('placeService') : null);

  if (!placeService && prisma) {
    const placeRepository = new PrismaPlaceRepository({ prisma });
    placeService = new PlaceService({ placeRepository });
  }

  const listTablesUsecase = overrides.listTablesUsecase ?? new ListTablesUsecase({ tableService, placeService });
  const getTableUsecase = overrides.getTableUsecase ?? new GetTableUsecase({ tableService, placeService });
  const createTableUsecase = overrides.createTableUsecase ?? new CreateTableUsecase({ tableService, placeService });
  const updateTableUsecase = overrides.updateTableUsecase ?? new UpdateTableUsecase({ tableService, placeService });
  const deleteTableUsecase = overrides.deleteTableUsecase ?? new DeleteTableUsecase({ tableService, placeService });

  const tablePresenter = overrides.tablePresenter ?? new TablePresenter();
  const tableController = overrides.tableController ?? new TableController({
    tablePresenter,
    listTablesUsecase,
    getTableUsecase,
    createTableUsecase,
    updateTableUsecase,
    deleteTableUsecase,
  });

  container.set('tableRepository', tableRepository);
  container.set('tableService', tableService);
  container.set('listTablesUsecase', listTablesUsecase);
  container.set('getTableUsecase', getTableUsecase);
  container.set('createTableUsecase', createTableUsecase);
  container.set('updateTableUsecase', updateTableUsecase);
  container.set('deleteTableUsecase', deleteTableUsecase);
  container.set('tablePresenter', tablePresenter);
  container.set('tableController', tableController);
}

