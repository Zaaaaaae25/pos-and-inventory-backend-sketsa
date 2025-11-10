import CategoryRepository from '../../Domains/Categories/Repositories/CategoryRepository.js';

export default class PrismaCategoryRepository extends CategoryRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_CATEGORY_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  findAll() { return this._prisma.category.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.category.findUnique({ where: { id } }); }
  findByName(name) { if (!name) return null; return this._prisma.category.findUnique({ where: { name } }); }
  createCategory(data) { return this._prisma.category.create({ data }); }
  async updateCategory({ id, data }) {
    try { return await this._prisma.category.update({ where: { id }, data }); }
    catch (error) { if (error?.code === 'P2025') return null; throw error; }
  }
  async deleteCategory(id) {
    try { await this._prisma.category.delete({ where: { id } }); return true; }
    catch (error) { if (error?.code === 'P2025') return false; throw error; }
  }
}

