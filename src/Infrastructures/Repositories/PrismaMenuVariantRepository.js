import MenuVariant from '../../Domains/MenuVariants/Entities/MenuVariant.js';
import MenuVariantRepository from '../../Domains/MenuVariants/Repositories/MenuVariantRepository.js';

export default class PrismaMenuVariantRepository extends MenuVariantRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_MENUVARIANT_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.menuVariant.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => MenuVariant.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.menuVariant.findUnique({ where: { id } });
    return MenuVariant.fromPersistence(record);
  }

  async createMenuVariant(data) {
    const record = await this._prisma.menuVariant.create({ data });
    return MenuVariant.fromPersistence(record);
  }

  async updateMenuVariant({ id, data }) {
    try {
      const record = await this._prisma.menuVariant.update({ where: { id }, data });
      return MenuVariant.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteMenuVariant(id) {
    try {
      await this._prisma.menuVariant.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
