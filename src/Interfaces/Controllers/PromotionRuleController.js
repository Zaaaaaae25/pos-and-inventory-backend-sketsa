import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class PromotionRuleController {
  constructor({ presenter, listUsecase, getUsecase, createUsecase, deleteUsecase } = {}) {
    const deps = [
      ['presenter', presenter],
      ['listUsecase', listUsecase],
      ['getUsecase', getUsecase],
      ['createUsecase', createUsecase],
      ['deleteUsecase', deleteUsecase],
    ];
    const miss = deps.find(([,v]) => !v); if (miss) throw new Error(`PromotionRuleController requires ${miss[0]}`);
    Object.assign(this, Object.fromEntries(deps));
  }

  async list(){ const records = await this.listUsecase.execute(); return { status: HttpStatus.OK, data: this.presenter.presentCollection(records) }; }
  async get({ params }){ const rec = await this.getUsecase.execute(params.id); return { status: HttpStatus.OK, data: this.presenter.present(rec) }; }
  async create({ body }){ const rec = await this.createUsecase.execute(body); return { status: HttpStatus.CREATED, data: this.presenter.present(rec) }; }
  async delete({ params }){ await this.deleteUsecase.execute(params.id); return { status: HttpStatus.NO_CONTENT }; }
}

