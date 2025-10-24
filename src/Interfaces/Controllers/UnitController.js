import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class UnitController {
  constructor({
    unitPresenter,
    listUnitsUsecase,
    getUnitUsecase,
    createUnitUsecase,
    updateUnitUsecase,
    deleteUnitUsecase,
  }) {
    if (!unitPresenter) throw new Error('UnitController requires a presenter');
    const reqs = [
      ['listUnitsUsecase', listUnitsUsecase],
      ['getUnitUsecase', getUnitUsecase],
      ['createUnitUsecase', createUnitUsecase],
      ['updateUnitUsecase', updateUnitUsecase],
      ['deleteUnitUsecase', deleteUnitUsecase],
    ];
    const miss = reqs.find(([, v]) => !v);
    if (miss) throw new Error(`UnitController requires ${miss[0]}`);

    this.unitPresenter = unitPresenter;
    this.listUnitsUsecase = listUnitsUsecase;
    this.getUnitUsecase = getUnitUsecase;
    this.createUnitUsecase = createUnitUsecase;
    this.updateUnitUsecase = updateUnitUsecase;
    this.deleteUnitUsecase = deleteUnitUsecase;
  }

  async listUnits() {
    const records = await this.listUnitsUsecase.execute();
    return { status: HttpStatus.OK, data: this.unitPresenter.presentCollection(records) };
  }
  async getUnit({ params }) {
    const record = await this.getUnitUsecase.execute(params.id);
    return { status: HttpStatus.OK, data: this.unitPresenter.present(record) };
  }
  async createUnit({ body }) {
    const record = await this.createUnitUsecase.execute(body);
    return { status: HttpStatus.CREATED, data: this.unitPresenter.present(record) };
  }
  async updateUnit({ params, body }) {
    const record = await this.updateUnitUsecase.execute(params.id, body);
    return { status: HttpStatus.OK, data: this.unitPresenter.present(record) };
  }
  async deleteUnit({ params }) {
    await this.deleteUnitUsecase.execute(params.id);
    return { status: HttpStatus.NO_CONTENT };
  }
}

