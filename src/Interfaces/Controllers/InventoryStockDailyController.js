import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class InventoryStockDailyController {
  constructor({ presenter, listUsecase, getUsecase, createUsecase, updateUsecase, deleteUsecase } = {}) {
    const deps = [
      ['presenter', presenter],
      ['listUsecase', listUsecase],
      ['getUsecase', getUsecase],
      ['createUsecase', createUsecase],
      ['updateUsecase', updateUsecase],
      ['deleteUsecase', deleteUsecase],
    ];
    const miss = deps.find(([,v]) => !v); if (miss) throw new Error(`InventoryStockDailyController requires ${miss[0]}`);
    Object.assign(this, Object.fromEntries(deps));
  }

  async list(){ const records = await this.listUsecase.execute(); return { status: HttpStatus.OK, data: this.presenter.presentCollection(records) }; }
  async get({ params }){ const rec = await this.getUsecase.execute(params.id); return { status: HttpStatus.OK, data: this.presenter.present(rec) }; }
  async create({ body }){ const rec = await this.createUsecase.execute(body); return { status: HttpStatus.CREATED, data: this.presenter.present(rec) }; }
  async update({ params, body }){ const rec = await this.updateUsecase.execute(params.id, body); return { status: HttpStatus.OK, data: this.presenter.present(rec) }; }
  async delete({ params }){ await this.deleteUsecase.execute(params.id); return { status: HttpStatus.NO_CONTENT }; }
}

