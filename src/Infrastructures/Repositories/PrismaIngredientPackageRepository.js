import IngredientPackageRepository from '../../Domains/Ingredients/Repositories/IngredientPackageRepository.js';

export default class PrismaIngredientPackageRepository extends IngredientPackageRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_INGREDIENT_PACKAGE_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  findAll() {
    return this._prisma.ingredientPackage.findMany({ orderBy: { id: 'asc' } });
  }

  findById(id) {
    return this._prisma.ingredientPackage.findUnique({ where: { id } });
  }

  createIngredientPackage(data) {
    return this._prisma.ingredientPackage.create({ data });
  }

  async updateIngredientPackage({ id, data }) {
    try { return await this._prisma.ingredientPackage.update({ where: { id }, data }); }
    catch (error) { if (error?.code === 'P2025') return null; throw error; }
  }

  async deleteIngredientPackage(id) {
    try { await this._prisma.ingredientPackage.delete({ where: { id } }); return true; }
    catch (error) { if (error?.code === 'P2025') return false; throw error; }
  }
}

