import IngredientPackage from '../../Domains/Ingredients/Entities/IngredientPackage.js';
import IngredientPackageRepository from '../../Domains/Ingredients/Repositories/IngredientPackageRepository.js';

export default class PrismaIngredientPackageRepository extends IngredientPackageRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_INGREDIENT_PACKAGE_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.ingredientPackage.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => IngredientPackage.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.ingredientPackage.findUnique({ where: { id } });
    return IngredientPackage.fromPersistence(record);
  }

  async createIngredientPackage(data) {
    const record = await this._prisma.ingredientPackage.create({ data });
    return IngredientPackage.fromPersistence(record);
  }

  async updateIngredientPackage({ id, data }) {
    try {
      const record = await this._prisma.ingredientPackage.update({ where: { id }, data });
      return IngredientPackage.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteIngredientPackage(id) {
    try {
      await this._prisma.ingredientPackage.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
