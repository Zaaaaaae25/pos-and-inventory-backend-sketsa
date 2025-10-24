import PrismaUnitRepository from '../Repositories/PrismaUnitRepository.js';
import UnitService from '../../Applications/Units/Services/UnitService.js';
import {
  ListUnitsUsecase,
  GetUnitUsecase,
  CreateUnitUsecase,
  UpdateUnitUsecase,
  DeleteUnitUsecase,
} from '../../Applications/Units/UseCases/index.js';
import UnitPresenter from '../../Interfaces/Presenters/UnitPresenter.js';
import UnitController from '../../Interfaces/Controllers/UnitController.js';

export default function registerUnitContainer({ container, overrides = {}, prisma }) {
  const unitRepository = overrides.unitRepository ?? new PrismaUnitRepository({ prisma });
  const unitService = overrides.unitService ?? new UnitService({ unitRepository });
  const listUnitsUsecase = overrides.listUnitsUsecase ?? new ListUnitsUsecase({ unitService });
  const getUnitUsecase = overrides.getUnitUsecase ?? new GetUnitUsecase({ unitService });
  const createUnitUsecase = overrides.createUnitUsecase ?? new CreateUnitUsecase({ unitService });
  const updateUnitUsecase = overrides.updateUnitUsecase ?? new UpdateUnitUsecase({ unitService });
  const deleteUnitUsecase = overrides.deleteUnitUsecase ?? new DeleteUnitUsecase({ unitService });
  const unitPresenter = overrides.unitPresenter ?? new UnitPresenter();
  const unitController = overrides.unitController ?? new UnitController({
    unitPresenter,
    listUnitsUsecase,
    getUnitUsecase,
    createUnitUsecase,
    updateUnitUsecase,
    deleteUnitUsecase,
  });

  container.set('unitRepository', unitRepository);
  container.set('unitService', unitService);
  container.set('listUnitsUsecase', listUnitsUsecase);
  container.set('getUnitUsecase', getUnitUsecase);
  container.set('createUnitUsecase', createUnitUsecase);
  container.set('updateUnitUsecase', updateUnitUsecase);
  container.set('deleteUnitUsecase', deleteUnitUsecase);
  container.set('unitPresenter', unitPresenter);
  container.set('unitController', unitController);
}

