import ActivityLogRepository from '../../../Domains/Logs/Repositories/ActivityLogRepository.js';

export default class ActivityLogService {
  constructor({ activityLogRepository } = {}){ if(!activityLogRepository) throw new Error('ACTIVITYLOG_SERVICE.MISSING_REPOSITORY'); if(!(activityLogRepository instanceof ActivityLogRepository)){ const methods=['findAll','findById','createActivityLog','deleteActivityLog']; const missing=methods.find((m)=>typeof activityLogRepository[m]!=='function'); if(missing) throw new Error(`ACTIVITYLOG_SERVICE.INVALID_REPOSITORY: missing ${missing}`);} this._repo=activityLogRepository; }
  listActivityLogs(){ return this._repo.findAll(); }
  getActivityLog(id){ return this._repo.findById(id); }
  createActivityLog(data){ return this._repo.createActivityLog(data); }
  deleteActivityLog(id){ return this._repo.deleteActivityLog(id); }
}

