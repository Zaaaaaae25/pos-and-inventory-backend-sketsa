import ReportFile from '../../Domains/ReportFiles/Entities/ReportFile.js';
import ReportFileRepository from '../../Domains/ReportFiles/Repositories/ReportFileRepository.js';

export default class PrismaReportFileRepository extends ReportFileRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_REPORTFILE_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.reportFile.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => ReportFile.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.reportFile.findUnique({ where: { id } });
    return ReportFile.fromPersistence(record);
  }

  async createReportFile(data) {
    const record = await this._prisma.reportFile.create({ data });
    return ReportFile.fromPersistence(record);
  }

  async updateReportFile({ id, data }) {
    try {
      const record = await this._prisma.reportFile.update({ where: { id }, data });
      return ReportFile.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteReportFile(id) {
    try {
      await this._prisma.reportFile.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
