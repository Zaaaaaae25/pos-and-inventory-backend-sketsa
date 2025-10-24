import BasePackageUsecase from './BasePackageUsecase.js';

export default class ListPackagesUsecase extends BasePackageUsecase {
  async execute() { return this.packageService.listPackages(); }
}

