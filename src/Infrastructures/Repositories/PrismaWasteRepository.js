import Waste from '../../Domains/Stocks/Entities/Waste.js';
import WasteRepository from '../../Domains/Stocks/Repositories/WasteRepository.js';

export default class PrismaWasteRepository extends WasteRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_WASTE_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.waste.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => Waste.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.waste.findUnique({ where: { id } });
    return Waste.fromPersistence(record);
  }

  async createWaste(data) {
    const record = await this._prisma.waste.create({ data });
    return Waste.fromPersistence(record);
  }

  async updateWaste({ id, data }) {
    try {
      const record = await this._prisma.waste.update({ where: { id }, data });
      return Waste.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteWaste(id) {
    try {
      await this._prisma.waste.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
