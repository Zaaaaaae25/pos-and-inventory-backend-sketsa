import BaseReportFileUsecase from './BaseReportFileUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class CreateReportFileUsecase extends BaseReportFileUsecase {
  async execute(payload={}){
    const reportType=String(payload.reportType??'').trim(); if(!reportType) throw new ValidationError('reportType is required');
    const reportScope=String(payload.reportScope??'').trim(); if(!reportScope) throw new ValidationError('reportScope is required');
    const data={ reportType, reportScope };
    if(typeof payload.reportDate!=='undefined') data.reportDate = payload.reportDate ? new Date(payload.reportDate) : null;
    if(typeof payload.placeId!=='undefined') data.placeId = payload.placeId === null ? null : Number(payload.placeId);
    const fileName=String(payload.fileName??'').trim(); if(!fileName) throw new ValidationError('fileName is required');
    const filePath=String(payload.filePath??'').trim(); if(!filePath) throw new ValidationError('filePath is required');
    data.fileName=fileName; data.filePath=filePath;
    return this.reportFileService.createReportFile(data);
  }
}

