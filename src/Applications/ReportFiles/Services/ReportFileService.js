import ReportFileRepository from '../../../Domains/ReportFiles/Repositories/ReportFileRepository.js';

export default class ReportFileService {
  constructor({ reportFileRepository } = {}){ if(!reportFileRepository) throw new Error('REPORTFILE_SERVICE.MISSING_REPOSITORY'); if(!(reportFileRepository instanceof ReportFileRepository)){ const methods=['findAll','findById','createReportFile','updateReportFile','deleteReportFile']; const missing=methods.find((m)=>typeof reportFileRepository[m]!=='function'); if(missing) throw new Error(`REPORTFILE_SERVICE.INVALID_REPOSITORY: missing ${missing}`);} this._repo=reportFileRepository; }
  listReportFiles(){ return this._repo.findAll(); }
  getReportFile(id){ return this._repo.findById(id); }
  createReportFile(data){ return this._repo.createReportFile(data); }
  updateReportFile(payload){ return this._repo.updateReportFile(payload); }
  deleteReportFile(id){ return this._repo.deleteReportFile(id); }
}

