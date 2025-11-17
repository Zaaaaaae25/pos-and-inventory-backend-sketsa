import MenuPrice from '../../Domains/MenuPrices/Entities/MenuPrice.js';
import MenuPriceRepository from '../../Domains/MenuPrices/Repositories/MenuPriceRepository.js';

export default class PrismaMenuPriceRepository extends MenuPriceRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_MENUPRICE_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.menuPrice.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => MenuPrice.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.menuPrice.findUnique({ where: { id } });
    return MenuPrice.fromPersistence(record);
  }

  async createMenuPrice(data) {
    const record = await this._prisma.menuPrice.create({ data });
    return MenuPrice.fromPersistence(record);
  }

  async updateMenuPrice({ id, data }) {
    try {
      const record = await this._prisma.menuPrice.update({ where: { id }, data });
      return MenuPrice.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteMenuPrice(id) {
    try {
      await this._prisma.menuPrice.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
