import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class MenuVariantItemController {
  constructor({
    menuVariantItemPresenter,
    listMenuVariantItemsUsecase,
    getMenuVariantItemUsecase,
    createMenuVariantItemUsecase,
    updateMenuVariantItemUsecase,
    deleteMenuVariantItemUsecase,
  }){
    if(!menuVariantItemPresenter) throw new Error('MenuVariantItemController requires a presenter');
    const deps=[
      ['listMenuVariantItemsUsecase',listMenuVariantItemsUsecase],
      ['getMenuVariantItemUsecase',getMenuVariantItemUsecase],
      ['createMenuVariantItemUsecase',createMenuVariantItemUsecase],
      ['updateMenuVariantItemUsecase',updateMenuVariantItemUsecase],
      ['deleteMenuVariantItemUsecase',deleteMenuVariantItemUsecase],
    ];
    const miss=deps.find(([,v])=>!v); if(miss) throw new Error(`MenuVariantItemController requires ${miss[0]}`);
    this.menuVariantItemPresenter=menuVariantItemPresenter;
    this.listMenuVariantItemsUsecase=listMenuVariantItemsUsecase;
    this.getMenuVariantItemUsecase=getMenuVariantItemUsecase;
    this.createMenuVariantItemUsecase=createMenuVariantItemUsecase;
    this.updateMenuVariantItemUsecase=updateMenuVariantItemUsecase;
    this.deleteMenuVariantItemUsecase=deleteMenuVariantItemUsecase;
  }

  async listMenuVariantItems(){ const recs=await this.listMenuVariantItemsUsecase.execute(); return { status: HttpStatus.OK, data: this.menuVariantItemPresenter.presentCollection(recs) }; }
  async getMenuVariantItem({params}){ const rec=await this.getMenuVariantItemUsecase.execute(params.id); return { status: HttpStatus.OK, data: this.menuVariantItemPresenter.present(rec) }; }
  async createMenuVariantItem({body}){ const rec=await this.createMenuVariantItemUsecase.execute(body); return { status: HttpStatus.CREATED, data: this.menuVariantItemPresenter.present(rec) }; }
  async updateMenuVariantItem({params,body}){ const rec=await this.updateMenuVariantItemUsecase.execute(params.id, body); return { status: HttpStatus.OK, data: this.menuVariantItemPresenter.present(rec) }; }
  async deleteMenuVariantItem({params}){ await this.deleteMenuVariantItemUsecase.execute(params.id); return { status: HttpStatus.NO_CONTENT }; }
}

