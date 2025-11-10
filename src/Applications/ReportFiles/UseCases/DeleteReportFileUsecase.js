import BaseReportFileUsecase from './BaseReportFileUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class DeleteReportFileUsecase extends BaseReportFileUsecase {
  async execute(id){ const intId=this._toInt(id); const ok=await this.reportFileService.deleteReportFile(intId); if(!ok) throw new ValidationError('Report file not found'); return true; }
}

