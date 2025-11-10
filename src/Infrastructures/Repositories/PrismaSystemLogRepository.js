import SystemLogRepository from '../../Domains/Logs/Repositories/SystemLogRepository.js';

export default class PrismaSystemLogRepository extends SystemLogRepository {
  constructor({ prisma } = {}){ super(); if(!prisma) throw new Error('PRISMA_SYSTEMLOG_REPOSITORY.MISSING_CLIENT'); this._prisma=prisma; }
  findAll(){ return this._prisma.systemLog.findMany({ orderBy: { id: 'asc' } }); }
  findById(id){ return this._prisma.systemLog.findUnique({ where: { id } }); }
  createSystemLog(data){ return this._prisma.systemLog.create({ data }); }
  async deleteSystemLog(id){ try { await this._prisma.systemLog.delete({ where: { id } }); return true; } catch(e){ if(e?.code==='P2025') return false; throw e; } }
}

