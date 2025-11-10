import BaseReportFileUsecase from './BaseReportFileUsecase.js';

export default class ListReportFilesUsecase extends BaseReportFileUsecase { async execute(){ return this.reportFileService.listReportFiles(); } }

