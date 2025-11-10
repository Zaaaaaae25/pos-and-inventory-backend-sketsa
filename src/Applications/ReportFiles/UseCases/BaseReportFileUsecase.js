import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BaseReportFileUsecase {
  constructor({ reportFileService } = {}){ if(!reportFileService) throw new Error('REPORTFILE_USECASE.MISSING_SERVICE'); this.reportFileService=reportFileService; }
  _toInt(v,name='id'){ const n=Number(v); if(!Number.isInteger(n)||n<=0) throw new ValidationError(`${name} must be a positive integer`); return n; }
}

