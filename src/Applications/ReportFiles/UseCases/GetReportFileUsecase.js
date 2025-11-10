import BaseReportFileUsecase from './BaseReportFileUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class GetReportFileUsecase extends BaseReportFileUsecase { async execute(id){ const intId=this._toInt(id); const rec=await this.reportFileService.getReportFile(intId); if(!rec) throw new ValidationError('Report file not found'); return rec; } }

