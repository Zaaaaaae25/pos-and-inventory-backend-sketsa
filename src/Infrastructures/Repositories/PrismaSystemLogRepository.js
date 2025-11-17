import SystemLog from '../../Domains/Logs/Entities/SystemLog.js';
import SystemLogRepository from '../../Domains/Logs/Repositories/SystemLogRepository.js';

export default class PrismaSystemLogRepository extends SystemLogRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_SYSTEMLOG_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.systemLog.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => SystemLog.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.systemLog.findUnique({ where: { id } });
    return SystemLog.fromPersistence(record);
  }

  async createSystemLog(data) {
    const record = await this._prisma.systemLog.create({ data });
    return SystemLog.fromPersistence(record);
  }

  async deleteSystemLog(id) {
    try {
      await this._prisma.systemLog.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
