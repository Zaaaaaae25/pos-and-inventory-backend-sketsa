import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class MenuController {
  constructor({
    menuPresenter,
    listMenusUsecase,
    getMenuUsecase,
    createMenuUsecase,
    updateMenuUsecase,
    deleteMenuUsecase,
  }) {
    if (!menuPresenter) throw new Error('MenuController requires a presenter');
    const deps = [
      ['listMenusUsecase', listMenusUsecase],
      ['getMenuUsecase', getMenuUsecase],
      ['createMenuUsecase', createMenuUsecase],
      ['updateMenuUsecase', updateMenuUsecase],
      ['deleteMenuUsecase', deleteMenuUsecase],
    ];
    const miss = deps.find(([, v]) => !v);
    if (miss) throw new Error(`MenuController requires ${miss[0]}`);

    this.menuPresenter = menuPresenter;
    this.listMenusUsecase = listMenusUsecase;
    this.getMenuUsecase = getMenuUsecase;
    this.createMenuUsecase = createMenuUsecase;
    this.updateMenuUsecase = updateMenuUsecase;
    this.deleteMenuUsecase = deleteMenuUsecase;
  }

  async listMenus() { const records = await this.listMenusUsecase.execute(); return { status: HttpStatus.OK, data: this.menuPresenter.presentCollection(records) }; }
  async getMenu({ params }) { const rec = await this.getMenuUsecase.execute(params.id); return { status: HttpStatus.OK, data: this.menuPresenter.present(rec) }; }
  async createMenu({ body }) { const rec = await this.createMenuUsecase.execute(body); return { status: HttpStatus.CREATED, data: this.menuPresenter.present(rec) }; }
  async updateMenu({ params, body }) { const rec = await this.updateMenuUsecase.execute(params.id, body); return { status: HttpStatus.OK, data: this.menuPresenter.present(rec) }; }
  async deleteMenu({ params }) { await this.deleteMenuUsecase.execute(params.id); return { status: HttpStatus.NO_CONTENT }; }
}

