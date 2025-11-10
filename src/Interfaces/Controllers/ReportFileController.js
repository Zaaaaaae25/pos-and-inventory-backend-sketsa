import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class ReportFileController {
  constructor({
    reportFilePresenter,
    listReportFilesUsecase,
    getReportFileUsecase,
    createReportFileUsecase,
    updateReportFileUsecase,
    deleteReportFileUsecase,
  }){
    if(!reportFilePresenter) throw new Error('ReportFileController requires a presenter');
    const deps=[
      ['listReportFilesUsecase',listReportFilesUsecase],
      ['getReportFileUsecase',getReportFileUsecase],
      ['createReportFileUsecase',createReportFileUsecase],
      ['updateReportFileUsecase',updateReportFileUsecase],
      ['deleteReportFileUsecase',deleteReportFileUsecase],
    ];
    const miss=deps.find(([,v])=>!v); if(miss) throw new Error(`ReportFileController requires ${miss[0]}`);
    this.reportFilePresenter=reportFilePresenter;
    this.listReportFilesUsecase=listReportFilesUsecase;
    this.getReportFileUsecase=getReportFileUsecase;
    this.createReportFileUsecase=createReportFileUsecase;
    this.updateReportFileUsecase=updateReportFileUsecase;
    this.deleteReportFileUsecase=deleteReportFileUsecase;
  }

  async listReportFiles(){ const recs=await this.listReportFilesUsecase.execute(); return { status: HttpStatus.OK, data: this.reportFilePresenter.presentCollection(recs) }; }
  async getReportFile({params}){ const rec=await this.getReportFileUsecase.execute(params.id); return { status: HttpStatus.OK, data: this.reportFilePresenter.present(rec) }; }
  async createReportFile({body}){ const rec=await this.createReportFileUsecase.execute(body); return { status: HttpStatus.CREATED, data: this.reportFilePresenter.present(rec) }; }
  async updateReportFile({params,body}){ const rec=await this.updateReportFileUsecase.execute(params.id, body); return { status: HttpStatus.OK, data: this.reportFilePresenter.present(rec) }; }
  async deleteReportFile({params}){ await this.deleteReportFileUsecase.execute(params.id); return { status: HttpStatus.NO_CONTENT }; }
}

