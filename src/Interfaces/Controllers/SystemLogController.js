import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class SystemLogController {
  constructor({ systemLogPresenter, listSystemLogsUsecase, getSystemLogUsecase, createSystemLogUsecase, deleteSystemLogUsecase }){
    if(!systemLogPresenter) throw new Error('SystemLogController requires a presenter');
    const deps=[['listSystemLogsUsecase',listSystemLogsUsecase],['getSystemLogUsecase',getSystemLogUsecase],['createSystemLogUsecase',createSystemLogUsecase],['deleteSystemLogUsecase',deleteSystemLogUsecase]];
    const miss=deps.find(([,v])=>!v); if(miss) throw new Error(`SystemLogController requires ${miss[0]}`);
    this.systemLogPresenter=systemLogPresenter;
    this.listSystemLogsUsecase=listSystemLogsUsecase;
    this.getSystemLogUsecase=getSystemLogUsecase;
    this.createSystemLogUsecase=createSystemLogUsecase;
    this.deleteSystemLogUsecase=deleteSystemLogUsecase;
  }
  async listSystemLogs(){ const recs=await this.listSystemLogsUsecase.execute(); return { status: HttpStatus.OK, data: this.systemLogPresenter.presentCollection(recs) }; }
  async getSystemLog({params}){ const rec=await this.getSystemLogUsecase.execute(params.id); return { status: HttpStatus.OK, data: this.systemLogPresenter.present(rec) }; }
  async createSystemLog({body}){ const rec=await this.createSystemLogUsecase.execute(body); return { status: HttpStatus.CREATED, data: this.systemLogPresenter.present(rec) }; }
  async deleteSystemLog({params}){ await this.deleteSystemLogUsecase.execute(params.id); return { status: HttpStatus.NO_CONTENT }; }
}

