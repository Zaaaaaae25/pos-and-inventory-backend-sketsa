import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class MenuVariantController {
  constructor({
    menuVariantPresenter,
    listMenuVariantsUsecase,
    getMenuVariantUsecase,
    createMenuVariantUsecase,
    updateMenuVariantUsecase,
    deleteMenuVariantUsecase,
  }){
    if(!menuVariantPresenter) throw new Error('MenuVariantController requires a presenter');
    const deps=[
      ['listMenuVariantsUsecase',listMenuVariantsUsecase],
      ['getMenuVariantUsecase',getMenuVariantUsecase],
      ['createMenuVariantUsecase',createMenuVariantUsecase],
      ['updateMenuVariantUsecase',updateMenuVariantUsecase],
      ['deleteMenuVariantUsecase',deleteMenuVariantUsecase],
    ];
    const miss=deps.find(([,v])=>!v); if(miss) throw new Error(`MenuVariantController requires ${miss[0]}`);
    this.menuVariantPresenter=menuVariantPresenter;
    this.listMenuVariantsUsecase=listMenuVariantsUsecase;
    this.getMenuVariantUsecase=getMenuVariantUsecase;
    this.createMenuVariantUsecase=createMenuVariantUsecase;
    this.updateMenuVariantUsecase=updateMenuVariantUsecase;
    this.deleteMenuVariantUsecase=deleteMenuVariantUsecase;
  }

  async listMenuVariants(){ const recs=await this.listMenuVariantsUsecase.execute(); return { status: HttpStatus.OK, data: this.menuVariantPresenter.presentCollection(recs) }; }
  async getMenuVariant({params}){ const rec=await this.getMenuVariantUsecase.execute(params.id); return { status: HttpStatus.OK, data: this.menuVariantPresenter.present(rec) }; }
  async createMenuVariant({body}){ const rec=await this.createMenuVariantUsecase.execute(body); return { status: HttpStatus.CREATED, data: this.menuVariantPresenter.present(rec) }; }
  async updateMenuVariant({params,body}){ const rec=await this.updateMenuVariantUsecase.execute(params.id, body); return { status: HttpStatus.OK, data: this.menuVariantPresenter.present(rec) }; }
  async deleteMenuVariant({params}){ await this.deleteMenuVariantUsecase.execute(params.id); return { status: HttpStatus.NO_CONTENT }; }
}

