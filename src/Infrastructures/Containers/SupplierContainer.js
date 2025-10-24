import PrismaSupplierRepository from '../Repositories/PrismaSupplierRepository.js';
import SupplierService from '../../Applications/Suppliers/Services/SupplierService.js';
import {
  ListSuppliersUsecase,
  GetSupplierUsecase,
  CreateSupplierUsecase,
  UpdateSupplierUsecase,
  DeleteSupplierUsecase,
} from '../../Applications/Suppliers/UseCases/index.js';
import SupplierPresenter from '../../Interfaces/Presenters/SupplierPresenter.js';
import SupplierController from '../../Interfaces/Controllers/SupplierController.js';

export default function registerSupplierContainer({ container, overrides = {}, prisma }) {
  const supplierRepository = overrides.supplierRepository ?? new PrismaSupplierRepository({ prisma });
  const supplierService = overrides.supplierService ?? new SupplierService({ supplierRepository });
  const listSuppliersUsecase = overrides.listSuppliersUsecase ?? new ListSuppliersUsecase({ supplierService });
  const getSupplierUsecase = overrides.getSupplierUsecase ?? new GetSupplierUsecase({ supplierService });
  const createSupplierUsecase = overrides.createSupplierUsecase ?? new CreateSupplierUsecase({ supplierService });
  const updateSupplierUsecase = overrides.updateSupplierUsecase ?? new UpdateSupplierUsecase({ supplierService });
  const deleteSupplierUsecase = overrides.deleteSupplierUsecase ?? new DeleteSupplierUsecase({ supplierService });
  const supplierPresenter = overrides.supplierPresenter ?? new SupplierPresenter();
  const supplierController = overrides.supplierController ?? new SupplierController({
    supplierPresenter,
    listSuppliersUsecase,
    getSupplierUsecase,
    createSupplierUsecase,
    updateSupplierUsecase,
    deleteSupplierUsecase,
  });

  container.set('supplierRepository', supplierRepository);
  container.set('supplierService', supplierService);
  container.set('listSuppliersUsecase', listSuppliersUsecase);
  container.set('getSupplierUsecase', getSupplierUsecase);
  container.set('createSupplierUsecase', createSupplierUsecase);
  container.set('updateSupplierUsecase', updateSupplierUsecase);
  container.set('deleteSupplierUsecase', deleteSupplierUsecase);
  container.set('supplierPresenter', supplierPresenter);
  container.set('supplierController', supplierController);
}

