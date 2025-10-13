import PrismaOutletRepository from '../Repositories/PrismaOutletRepository.js';
import OutletService from '../../Applications/Outlets/Services/OutletService.js';
import {
  ListOutletsUsecase,
  GetOutletUsecase,
  CreateOutletUsecase,
  UpdateOutletUsecase,
  DeleteOutletUsecase,
} from '../../Applications/Outlets/UseCases/index.js';
import OutletPresenter from '../../Interfaces/Presenters/OutletPresenter.js';
import OutletController from '../../Interfaces/Controllers/OutletController.js';


export default function registerOutletContainer({ container, overrides = {}, prisma }) {
  const outletRepository =
    overrides.outletRepository ?? new PrismaOutletRepository({ prisma });
  const outletService =
    overrides.outletService ?? new OutletService({ outletRepository });
  const listOutletsUsecase =
    overrides.listOutletsUsecase ?? new ListOutletsUsecase({ outletService });
  const getOutletUsecase =
    overrides.getOutletUsecase ?? new GetOutletUsecase({ outletService });
  const createOutletUsecase =
    overrides.createOutletUsecase ?? new CreateOutletUsecase({ outletService });
  const updateOutletUsecase =
    overrides.updateOutletUsecase ?? new UpdateOutletUsecase({ outletService });
  const deleteOutletUsecase =
    overrides.deleteOutletUsecase ?? new DeleteOutletUsecase({ outletService });

  const outletPresenter = overrides.outletPresenter ?? new OutletPresenter();
  const outletController =
    overrides.outletController ??
    new OutletController({
      outletPresenter,
      listOutletsUsecase,
      getOutletUsecase,
      createOutletUsecase,
      updateOutletUsecase,
      deleteOutletUsecase,
    });

  container.set('outletRepository', outletRepository);
  container.set('outletService', outletService);
  container.set('listOutletsUsecase', listOutletsUsecase);
  container.set('getOutletUsecase', getOutletUsecase);
  container.set('createOutletUsecase', createOutletUsecase);
  container.set('updateOutletUsecase', updateOutletUsecase);
  container.set('deleteOutletUsecase', deleteOutletUsecase);
  container.set('outletPresenter', outletPresenter);
  container.set('outletController', outletController);
}
