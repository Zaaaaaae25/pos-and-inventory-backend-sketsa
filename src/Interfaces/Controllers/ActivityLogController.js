import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class ActivityLogController {
  constructor({ activityLogPresenter, listActivityLogsUsecase, getActivityLogUsecase, createActivityLogUsecase, deleteActivityLogUsecase }){
    if(!activityLogPresenter) throw new Error('ActivityLogController requires a presenter');
    const deps=[['listActivityLogsUsecase',listActivityLogsUsecase],['getActivityLogUsecase',getActivityLogUsecase],['createActivityLogUsecase',createActivityLogUsecase],['deleteActivityLogUsecase',deleteActivityLogUsecase]];
    const miss=deps.find(([,v])=>!v); if(miss) throw new Error(`ActivityLogController requires ${miss[0]}`);
    this.activityLogPresenter=activityLogPresenter;
    this.listActivityLogsUsecase=listActivityLogsUsecase;
    this.getActivityLogUsecase=getActivityLogUsecase;
    this.createActivityLogUsecase=createActivityLogUsecase;
    this.deleteActivityLogUsecase=deleteActivityLogUsecase;
  }
  async listActivityLogs(){ const recs=await this.listActivityLogsUsecase.execute(); return { status: HttpStatus.OK, data: this.activityLogPresenter.presentCollection(recs) }; }
  async getActivityLog({params}){ const rec=await this.getActivityLogUsecase.execute(params.id); return { status: HttpStatus.OK, data: this.activityLogPresenter.present(rec) }; }
  async createActivityLog({body}){ const rec=await this.createActivityLogUsecase.execute(body); return { status: HttpStatus.CREATED, data: this.activityLogPresenter.present(rec) }; }
  async deleteActivityLog({params}){ await this.deleteActivityLogUsecase.execute(params.id); return { status: HttpStatus.NO_CONTENT }; }
}

