import PrismaPackageRepository from '../Repositories/PrismaPackageRepository.js';
import PackageService from '../../Applications/Packages/Services/PackageService.js';
import {
  ListPackagesUsecase,
  GetPackageUsecase,
  CreatePackageUsecase,
  UpdatePackageUsecase,
  DeletePackageUsecase,
} from '../../Applications/Packages/UseCases/index.js';
import PackagePresenter from '../../Interfaces/Presenters/PackagePresenter.js';
import PackageController from '../../Interfaces/Controllers/PackageController.js';

export default function registerPackageContainer({ container, overrides = {}, prisma }) {
  const packageRepository = overrides.packageRepository ?? new PrismaPackageRepository({ prisma });
  const packageService = overrides.packageService ?? new PackageService({ packageRepository });
  const listPackagesUsecase = overrides.listPackagesUsecase ?? new ListPackagesUsecase({ packageService });
  const getPackageUsecase = overrides.getPackageUsecase ?? new GetPackageUsecase({ packageService });
  const createPackageUsecase = overrides.createPackageUsecase ?? new CreatePackageUsecase({ packageService });
  const updatePackageUsecase = overrides.updatePackageUsecase ?? new UpdatePackageUsecase({ packageService });
  const deletePackageUsecase = overrides.deletePackageUsecase ?? new DeletePackageUsecase({ packageService });
  const packagePresenter = overrides.packagePresenter ?? new PackagePresenter();
  const packageController = overrides.packageController ?? new PackageController({
    packagePresenter,
    listPackagesUsecase,
    getPackageUsecase,
    createPackageUsecase,
    updatePackageUsecase,
    deletePackageUsecase,
  });

  container.set('packageRepository', packageRepository);
  container.set('packageService', packageService);
  container.set('listPackagesUsecase', listPackagesUsecase);
  container.set('getPackageUsecase', getPackageUsecase);
  container.set('createPackageUsecase', createPackageUsecase);
  container.set('updatePackageUsecase', updatePackageUsecase);
  container.set('deletePackageUsecase', deletePackageUsecase);
  container.set('packagePresenter', packagePresenter);
  container.set('packageController', packageController);
}

