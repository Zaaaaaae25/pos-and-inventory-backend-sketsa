import MenuVariantItem from '../../Domains/MenuVariantItems/Entities/MenuVariantItem.js';
import MenuVariantItemRepository from '../../Domains/MenuVariantItems/Repositories/MenuVariantItemRepository.js';

export default class PrismaMenuVariantItemRepository extends MenuVariantItemRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_MENUVARIANTITEM_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.menuVariantItem.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => MenuVariantItem.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.menuVariantItem.findUnique({ where: { id } });
    return MenuVariantItem.fromPersistence(record);
  }

  async createMenuVariantItem(data) {
    const record = await this._prisma.menuVariantItem.create({ data });
    return MenuVariantItem.fromPersistence(record);
  }

  async updateMenuVariantItem({ id, data }) {
    try {
      const record = await this._prisma.menuVariantItem.update({ where: { id }, data });
      return MenuVariantItem.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteMenuVariantItem(id) {
    try {
      await this._prisma.menuVariantItem.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
