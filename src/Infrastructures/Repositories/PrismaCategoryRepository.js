import Category from '../../Domains/Categories/Entities/Category.js';
import CategoryRepository from '../../Domains/Categories/Repositories/CategoryRepository.js';

export default class PrismaCategoryRepository extends CategoryRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_CATEGORY_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.category.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => Category.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.category.findUnique({ where: { id } });
    return Category.fromPersistence(record);
  }

  async findByName(name) {
    if (!name) return null;
    const record = await this._prisma.category.findUnique({ where: { name } });
    return Category.fromPersistence(record);
  }

  async createCategory(data) {
    const record = await this._prisma.category.create({ data });
    return Category.fromPersistence(record);
  }

  async updateCategory({ id, data }) {
    try {
      const record = await this._prisma.category.update({ where: { id }, data });
      return Category.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      await this._prisma.category.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
