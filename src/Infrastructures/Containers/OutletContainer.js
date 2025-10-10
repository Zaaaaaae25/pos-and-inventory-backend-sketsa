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

function createInMemoryOutletRepository() {
  const outlets = [];
  let sequence = 1;

  return {
    async findAll() {
      return outlets.map((outlet) => ({ ...outlet }));
    },

    async findById(id) {
      return outlets.find((outlet) => outlet.id === id) ?? null;
    },

    async createOutlet({ outletData }) {
      const record = {
        id: sequence++,
        name: outletData.name,
        address: outletData.address ?? null,
        phone: outletData.phone ?? null,
        isActive: typeof outletData.isActive === 'boolean' ? outletData.isActive : true,
      };
      outlets.push(record);
      return { ...record };
    },

    async updateOutlet({ id, outletData }) {
      const index = outlets.findIndex((outlet) => outlet.id === id);
      if (index === -1) {
        return null;
      }

      outlets[index] = {
        ...outlets[index],
        ...outletData,
      };

      return { ...outlets[index] };
    },

    async deleteOutlet(id) {
      const index = outlets.findIndex((outlet) => outlet.id === id);
      if (index === -1) {
        return false;
      }

      outlets.splice(index, 1);
      return true;
    },
  };
}

export default function registerOutletContainer({ container, overrides = {}, prisma }) {
  const outletRepository =
    overrides.outletRepository ??
    (prisma ? new PrismaOutletRepository({ prisma }) : createInMemoryOutletRepository());

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
