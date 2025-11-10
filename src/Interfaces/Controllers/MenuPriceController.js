import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class MenuPriceController {
  constructor({
    menuPricePresenter,
    listMenuPricesUsecase,
    getMenuPriceUsecase,
    createMenuPriceUsecase,
    updateMenuPriceUsecase,
    deleteMenuPriceUsecase,
  }) {
    if (!menuPricePresenter) throw new Error('MenuPriceController requires a presenter');
    const deps = [
      ['listMenuPricesUsecase', listMenuPricesUsecase],
      ['getMenuPriceUsecase', getMenuPriceUsecase],
      ['createMenuPriceUsecase', createMenuPriceUsecase],
      ['updateMenuPriceUsecase', updateMenuPriceUsecase],
      ['deleteMenuPriceUsecase', deleteMenuPriceUsecase],
    ];
    const miss = deps.find(([, v]) => !v);
    if (miss) throw new Error(`MenuPriceController requires ${miss[0]}`);

    this.menuPricePresenter = menuPricePresenter;
    this.listMenuPricesUsecase = listMenuPricesUsecase;
    this.getMenuPriceUsecase = getMenuPriceUsecase;
    this.createMenuPriceUsecase = createMenuPriceUsecase;
    this.updateMenuPriceUsecase = updateMenuPriceUsecase;
    this.deleteMenuPriceUsecase = deleteMenuPriceUsecase;
  }

  async listMenuPrices() { const recs=await this.listMenuPricesUsecase.execute(); return { status: HttpStatus.OK, data: this.menuPricePresenter.presentCollection(recs) }; }
  async getMenuPrice({ params }) { const rec=await this.getMenuPriceUsecase.execute(params.id); return { status: HttpStatus.OK, data: this.menuPricePresenter.present(rec) }; }
  async createMenuPrice({ body }) { const rec=await this.createMenuPriceUsecase.execute(body); return { status: HttpStatus.CREATED, data: this.menuPricePresenter.present(rec) }; }
  async updateMenuPrice({ params, body }) { const rec=await this.updateMenuPriceUsecase.execute(params.id, body); return { status: HttpStatus.OK, data: this.menuPricePresenter.present(rec) }; }
  async deleteMenuPrice({ params }) { await this.deleteMenuPriceUsecase.execute(params.id); return { status: HttpStatus.NO_CONTENT }; }
}

