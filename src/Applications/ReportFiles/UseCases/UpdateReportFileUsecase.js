import BaseReportFileUsecase from './BaseReportFileUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class UpdateReportFileUsecase extends BaseReportFileUsecase {
  async execute(id,payload={}){
    const intId=this._toInt(id);
    const data={};
    if(typeof payload.reportType!=='undefined') data.reportType=String(payload.reportType).trim();
    if(typeof payload.reportScope!=='undefined') data.reportScope=String(payload.reportScope).trim();
    if(typeof payload.reportDate!=='undefined') data.reportDate = payload.reportDate ? new Date(payload.reportDate) : null;
    if(typeof payload.placeId!=='undefined') data.placeId = payload.placeId === null ? null : Number(payload.placeId);
    if(typeof payload.fileName!=='undefined') data.fileName=String(payload.fileName).trim();
    if(typeof payload.filePath!=='undefined') data.filePath=String(payload.filePath).trim();
    if(Object.keys(data).length===0) throw new ValidationError('No valid fields to update');
    const rec=await this.reportFileService.updateReportFile({ id:intId, data });
    if(!rec) throw new ValidationError('Report file not found');
    return rec;
  }
}

