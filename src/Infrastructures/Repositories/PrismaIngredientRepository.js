import IngredientRepository from '../../Domains/Ingredients/Repositories/IngredientRepository.js';

export default class PrismaIngredientRepository extends IngredientRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_INGREDIENT_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  findAll() {
    return this._prisma.ingredient.findMany({ orderBy: { id: 'asc' } });
  }

  findById(id) {
    return this._prisma.ingredient.findUnique({ where: { id } });
  }

  createIngredient(ingredientData) {
    return this._prisma.ingredient.create({ data: ingredientData });
  }

  async updateIngredient({ id, ingredientData }) {
    try {
      return await this._prisma.ingredient.update({ where: { id }, data: ingredientData });
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteIngredient(id) {
    try {
      await this._prisma.ingredient.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}

