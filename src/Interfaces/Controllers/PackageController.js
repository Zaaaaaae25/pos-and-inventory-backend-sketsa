import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class PackageController {
  constructor({
    packagePresenter,
    listPackagesUsecase,
    getPackageUsecase,
    createPackageUsecase,
    updatePackageUsecase,
    deletePackageUsecase,
  }) {
    if (!packagePresenter) throw new Error('PackageController requires a presenter');
    const reqs = [
      ['listPackagesUsecase', listPackagesUsecase],
      ['getPackageUsecase', getPackageUsecase],
      ['createPackageUsecase', createPackageUsecase],
      ['updatePackageUsecase', updatePackageUsecase],
      ['deletePackageUsecase', deletePackageUsecase],
    ];
    const miss = reqs.find(([, v]) => !v);
    if (miss) throw new Error(`PackageController requires ${miss[0]}`);

    this.packagePresenter = packagePresenter;
    this.listPackagesUsecase = listPackagesUsecase;
    this.getPackageUsecase = getPackageUsecase;
    this.createPackageUsecase = createPackageUsecase;
    this.updatePackageUsecase = updatePackageUsecase;
    this.deletePackageUsecase = deletePackageUsecase;
  }

  async listPackages() {
    const records = await this.listPackagesUsecase.execute();
    return { status: HttpStatus.OK, data: this.packagePresenter.presentCollection(records) };
  }
  async getPackage({ params }) {
    const record = await this.getPackageUsecase.execute(params.id);
    return { status: HttpStatus.OK, data: this.packagePresenter.present(record) };
  }
  async createPackage({ body }) {
    const record = await this.createPackageUsecase.execute(body);
    return { status: HttpStatus.CREATED, data: this.packagePresenter.present(record) };
  }
  async updatePackage({ params, body }) {
    const record = await this.updatePackageUsecase.execute(params.id, body);
    return { status: HttpStatus.OK, data: this.packagePresenter.present(record) };
  }
  async deletePackage({ params }) {
    await this.deletePackageUsecase.execute(params.id);
    return { status: HttpStatus.NO_CONTENT };
  }
}

