import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class SupplierProductController {
  constructor({
    supplierProductPresenter,
    listSupplierProductsUsecase,
    getSupplierProductUsecase,
    createSupplierProductUsecase,
    updateSupplierProductUsecase,
    deleteSupplierProductUsecase,
  }) {
    if (!supplierProductPresenter) throw new Error('SupplierProductController requires a presenter');
    const reqs = [
      ['listSupplierProductsUsecase', listSupplierProductsUsecase],
      ['getSupplierProductUsecase', getSupplierProductUsecase],
      ['createSupplierProductUsecase', createSupplierProductUsecase],
      ['updateSupplierProductUsecase', updateSupplierProductUsecase],
      ['deleteSupplierProductUsecase', deleteSupplierProductUsecase],
    ];
    const miss = reqs.find(([, v]) => !v);
    if (miss) throw new Error(`SupplierProductController requires ${miss[0]}`);

    this.supplierProductPresenter = supplierProductPresenter;
    this.listSupplierProductsUsecase = listSupplierProductsUsecase;
    this.getSupplierProductUsecase = getSupplierProductUsecase;
    this.createSupplierProductUsecase = createSupplierProductUsecase;
    this.updateSupplierProductUsecase = updateSupplierProductUsecase;
    this.deleteSupplierProductUsecase = deleteSupplierProductUsecase;
  }

  async listSupplierProducts() {
    const records = await this.listSupplierProductsUsecase.execute();
    return { status: HttpStatus.OK, data: this.supplierProductPresenter.presentCollection(records) };
  }
  async getSupplierProduct({ params }) {
    const record = await this.getSupplierProductUsecase.execute(params.id);
    return { status: HttpStatus.OK, data: this.supplierProductPresenter.present(record) };
  }
  async createSupplierProduct({ body }) {
    const record = await this.createSupplierProductUsecase.execute(body);
    return { status: HttpStatus.CREATED, data: this.supplierProductPresenter.present(record) };
  }
  async updateSupplierProduct({ params, body }) {
    const record = await this.updateSupplierProductUsecase.execute(params.id, body);
    return { status: HttpStatus.OK, data: this.supplierProductPresenter.present(record) };
  }
  async deleteSupplierProduct({ params }) {
    await this.deleteSupplierProductUsecase.execute(params.id);
    return { status: HttpStatus.NO_CONTENT };
  }
}

