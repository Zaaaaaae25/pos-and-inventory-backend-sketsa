import ActivityLogRepository from '../../Domains/Logs/Repositories/ActivityLogRepository.js';

export default class PrismaActivityLogRepository extends ActivityLogRepository {
  constructor({ prisma } = {}){ super(); if(!prisma) throw new Error('PRISMA_ACTIVITYLOG_REPOSITORY.MISSING_CLIENT'); this._prisma=prisma; }
  findAll(){ return this._prisma.activityLog.findMany({ orderBy: { id: 'asc' } }); }
  findById(id){ return this._prisma.activityLog.findUnique({ where: { id } }); }
  createActivityLog(data){ return this._prisma.activityLog.create({ data }); }
  async deleteActivityLog(id){ try { await this._prisma.activityLog.delete({ where: { id } }); return true; } catch(e){ if(e?.code==='P2025') return false; throw e; } }
}

