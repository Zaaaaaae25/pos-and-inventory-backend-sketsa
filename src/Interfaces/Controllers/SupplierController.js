import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class SupplierController {
  constructor({
    supplierPresenter,
    listSuppliersUsecase,
    getSupplierUsecase,
    createSupplierUsecase,
    updateSupplierUsecase,
    deleteSupplierUsecase,
  }) {
    if (!supplierPresenter) throw new Error('SupplierController requires a presenter');
    const reqs = [
      ['listSuppliersUsecase', listSuppliersUsecase],
      ['getSupplierUsecase', getSupplierUsecase],
      ['createSupplierUsecase', createSupplierUsecase],
      ['updateSupplierUsecase', updateSupplierUsecase],
      ['deleteSupplierUsecase', deleteSupplierUsecase],
    ];
    const miss = reqs.find(([, v]) => !v);
    if (miss) throw new Error(`SupplierController requires ${miss[0]}`);

    this.supplierPresenter = supplierPresenter;
    this.listSuppliersUsecase = listSuppliersUsecase;
    this.getSupplierUsecase = getSupplierUsecase;
    this.createSupplierUsecase = createSupplierUsecase;
    this.updateSupplierUsecase = updateSupplierUsecase;
    this.deleteSupplierUsecase = deleteSupplierUsecase;
  }

  async listSuppliers() {
    const records = await this.listSuppliersUsecase.execute();
    return { status: HttpStatus.OK, data: this.supplierPresenter.presentCollection(records) };
  }
  async getSupplier({ params }) {
    const record = await this.getSupplierUsecase.execute(params.id);
    return { status: HttpStatus.OK, data: this.supplierPresenter.present(record) };
  }
  async createSupplier({ body }) {
    const record = await this.createSupplierUsecase.execute(body);
    return { status: HttpStatus.CREATED, data: this.supplierPresenter.present(record) };
  }
  async updateSupplier({ params, body }) {
    const record = await this.updateSupplierUsecase.execute(params.id, body);
    return { status: HttpStatus.OK, data: this.supplierPresenter.present(record) };
  }
  async deleteSupplier({ params }) {
    await this.deleteSupplierUsecase.execute(params.id);
    return { status: HttpStatus.NO_CONTENT };
  }
}

