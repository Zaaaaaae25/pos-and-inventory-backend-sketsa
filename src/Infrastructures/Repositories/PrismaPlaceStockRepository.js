import PlaceStock from '../../Domains/Stocks/Entities/PlaceStock.js';
import PlaceStockRepository from '../../Domains/Stocks/Repositories/PlaceStockRepository.js';

export default class PrismaPlaceStockRepository extends PlaceStockRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_PLACESTOCK_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.placeStock.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => PlaceStock.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.placeStock.findUnique({ where: { id } });
    return PlaceStock.fromPersistence(record);
  }

  async createPlaceStock(data) {
    const record = await this._prisma.placeStock.create({ data });
    return PlaceStock.fromPersistence(record);
  }

  async updatePlaceStock({ id, data }) {
    try {
      const record = await this._prisma.placeStock.update({ where: { id }, data });
      return PlaceStock.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deletePlaceStock(id) {
    try {
      await this._prisma.placeStock.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
