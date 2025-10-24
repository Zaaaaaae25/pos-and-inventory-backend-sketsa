import PrismaSupplierProductRepository from '../Repositories/PrismaSupplierProductRepository.js';
import SupplierProductService from '../../Applications/Suppliers/Services/SupplierProductService.js';
import {
  ListSupplierProductsUsecase,
  GetSupplierProductUsecase,
  CreateSupplierProductUsecase,
  UpdateSupplierProductUsecase,
  DeleteSupplierProductUsecase,
} from '../../Applications/Suppliers/UseCases/supplierProductsIndex.js';
import SupplierProductPresenter from '../../Interfaces/Presenters/SupplierProductPresenter.js';
import SupplierProductController from '../../Interfaces/Controllers/SupplierProductController.js';
import SupplierService from '../../Applications/Suppliers/Services/SupplierService.js';
import PrismaSupplierRepository from '../Repositories/PrismaSupplierRepository.js';
import IngredientService from '../../Applications/Ingredients/Services/IngredientService.js';
import PrismaIngredientRepository from '../Repositories/PrismaIngredientRepository.js';
import PackageService from '../../Applications/Packages/Services/PackageService.js';
import PrismaPackageRepository from '../Repositories/PrismaPackageRepository.js';

export default function registerSupplierProductContainer({ container, overrides = {}, prisma }) {
  const supplierProductRepository = overrides.supplierProductRepository ?? new PrismaSupplierProductRepository({ prisma });
  const supplierProductService = overrides.supplierProductService ?? new SupplierProductService({ supplierProductRepository });

  let supplierService = overrides.supplierService ?? (container?.has('supplierService') ? container.get('supplierService') : null);
  if (!supplierService && prisma) supplierService = new SupplierService({ supplierRepository: new PrismaSupplierRepository({ prisma }) });

  let ingredientService = overrides.ingredientService ?? (container?.has('ingredientService') ? container.get('ingredientService') : null);
  if (!ingredientService && prisma) ingredientService = new IngredientService({ ingredientRepository: new PrismaIngredientRepository({ prisma }) });

  let packageService = overrides.packageService ?? (container?.has('packageService') ? container.get('packageService') : null);
  if (!packageService && prisma) packageService = new PackageService({ packageRepository: new PrismaPackageRepository({ prisma }) });

  const listSupplierProductsUsecase = overrides.listSupplierProductsUsecase ?? new ListSupplierProductsUsecase({ supplierProductService, supplierService, ingredientService, packageService });
  const getSupplierProductUsecase = overrides.getSupplierProductUsecase ?? new GetSupplierProductUsecase({ supplierProductService, supplierService, ingredientService, packageService });
  const createSupplierProductUsecase = overrides.createSupplierProductUsecase ?? new CreateSupplierProductUsecase({ supplierProductService, supplierService, ingredientService, packageService });
  const updateSupplierProductUsecase = overrides.updateSupplierProductUsecase ?? new UpdateSupplierProductUsecase({ supplierProductService, supplierService, ingredientService, packageService });
  const deleteSupplierProductUsecase = overrides.deleteSupplierProductUsecase ?? new DeleteSupplierProductUsecase({ supplierProductService, supplierService, ingredientService, packageService });

  const supplierProductPresenter = overrides.supplierProductPresenter ?? new SupplierProductPresenter();
  const supplierProductController = overrides.supplierProductController ?? new SupplierProductController({
    supplierProductPresenter,
    listSupplierProductsUsecase,
    getSupplierProductUsecase,
    createSupplierProductUsecase,
    updateSupplierProductUsecase,
    deleteSupplierProductUsecase,
  });

  container.set('supplierProductRepository', supplierProductRepository);
  container.set('supplierProductService', supplierProductService);
  container.set('listSupplierProductsUsecase', listSupplierProductsUsecase);
  container.set('getSupplierProductUsecase', getSupplierProductUsecase);
  container.set('createSupplierProductUsecase', createSupplierProductUsecase);
  container.set('updateSupplierProductUsecase', updateSupplierProductUsecase);
  container.set('deleteSupplierProductUsecase', deleteSupplierProductUsecase);
  container.set('supplierProductPresenter', supplierProductPresenter);
  container.set('supplierProductController', supplierProductController);
}

