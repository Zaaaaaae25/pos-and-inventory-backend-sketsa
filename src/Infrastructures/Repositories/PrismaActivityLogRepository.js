import ActivityLog from '../../Domains/Logs/Entities/ActivityLog.js';
import ActivityLogRepository from '../../Domains/Logs/Repositories/ActivityLogRepository.js';

export default class PrismaActivityLogRepository extends ActivityLogRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_ACTIVITYLOG_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.activityLog.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => ActivityLog.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.activityLog.findUnique({ where: { id } });
    return ActivityLog.fromPersistence(record);
  }

  async createActivityLog(data) {
    const record = await this._prisma.activityLog.create({ data });
    return ActivityLog.fromPersistence(record);
  }

  async deleteActivityLog(id) {
    try {
      await this._prisma.activityLog.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
