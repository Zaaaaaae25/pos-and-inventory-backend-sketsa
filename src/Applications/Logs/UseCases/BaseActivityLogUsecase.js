import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BaseActivityLogUsecase {
  constructor({ activityLogService } = {}){ if(!activityLogService) throw new Error('ACTIVITYLOG_USECASE.MISSING_SERVICE'); this.activityLogService=activityLogService; }
  _toInt(v,name='id'){ const n=Number(v); if(!Number.isInteger(n)||n<=0) throw new ValidationError(`${name} must be a positive integer`); return n; }
}

