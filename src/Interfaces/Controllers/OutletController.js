import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class OutletController {
  constructor({
    outletPresenter,
    listOutletsUsecase,
    getOutletUsecase,
    createOutletUsecase,
    updateOutletUsecase,
    deleteOutletUsecase,
  }) {
    if (!outletPresenter) {
      throw new Error('OutletController requires a presenter');
    }

    const requiredUsecases = [
      ['listOutletsUsecase', listOutletsUsecase],
      ['getOutletUsecase', getOutletUsecase],
      ['createOutletUsecase', createOutletUsecase],
      ['updateOutletUsecase', updateOutletUsecase],
      ['deleteOutletUsecase', deleteOutletUsecase],
    ];

    const missing = requiredUsecases.find(([, usecase]) => !usecase);
    if (missing) {
      throw new Error(`OutletController requires ${missing[0]}`);
    }

    this.outletPresenter = outletPresenter;
    this.listOutletsUsecase = listOutletsUsecase;
    this.getOutletUsecase = getOutletUsecase;
    this.createOutletUsecase = createOutletUsecase;
    this.updateOutletUsecase = updateOutletUsecase;
    this.deleteOutletUsecase = deleteOutletUsecase;
  }

  async listOutlets() {
    const outlets = await this.listOutletsUsecase.execute();
    return {
      status: HttpStatus.OK,
      data: this.outletPresenter.presentCollection(outlets),
    };
  }

  async getOutlet({ params }) {
    const outlet = await this.getOutletUsecase.execute(params.id);
    return {
      status: HttpStatus.OK,
      data: this.outletPresenter.present(outlet),
    };
  }

  async createOutlet({ body }) {
    const outlet = await this.createOutletUsecase.execute(body);
    return {
      status: HttpStatus.CREATED,
      data: this.outletPresenter.present(outlet),
    };
  }

  async updateOutlet({ params, body }) {
    const outlet = await this.updateOutletUsecase.execute(params.id, body);
    return {
      status: HttpStatus.OK,
      data: this.outletPresenter.present(outlet),
    };
  }

  async deleteOutlet({ params }) {
    await this.deleteOutletUsecase.execute(params.id);
    return {
      status: HttpStatus.NO_CONTENT,
    };
  }
}
