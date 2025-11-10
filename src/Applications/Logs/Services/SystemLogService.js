import SystemLogRepository from '../../../Domains/Logs/Repositories/SystemLogRepository.js';

export default class SystemLogService {
  constructor({ systemLogRepository } = {}){ if(!systemLogRepository) throw new Error('SYSTEMLOG_SERVICE.MISSING_REPOSITORY'); if(!(systemLogRepository instanceof SystemLogRepository)){ const methods=['findAll','findById','createSystemLog','deleteSystemLog']; const missing=methods.find((m)=>typeof systemLogRepository[m]!=='function'); if(missing) throw new Error(`SYSTEMLOG_SERVICE.INVALID_REPOSITORY: missing ${missing}`);} this._repo=systemLogRepository; }
  listSystemLogs(){ return this._repo.findAll(); }
  getSystemLog(id){ return this._repo.findById(id); }
  createSystemLog(data){ return this._repo.createSystemLog(data); }
  deleteSystemLog(id){ return this._repo.deleteSystemLog(id); }
}

