import ReportFileRepository from '../../Domains/ReportFiles/Repositories/ReportFileRepository.js';

export default class PrismaReportFileRepository extends ReportFileRepository {
  constructor({ prisma } = {}){ super(); if(!prisma) throw new Error('PRISMA_REPORTFILE_REPOSITORY.MISSING_CLIENT'); this._prisma=prisma; }
  findAll(){ return this._prisma.reportFile.findMany({ orderBy: { id: 'asc' } }); }
  findById(id){ return this._prisma.reportFile.findUnique({ where: { id } }); }
  createReportFile(data){ return this._prisma.reportFile.create({ data }); }
  async updateReportFile({ id, data }){ try { return await this._prisma.reportFile.update({ where: { id }, data }); } catch(e){ if(e?.code==='P2025') return null; throw e; } }
  async deleteReportFile(id){ try { await this._prisma.reportFile.delete({ where: { id } }); return true; } catch(e){ if(e?.code==='P2025') return false; throw e; } }
}

