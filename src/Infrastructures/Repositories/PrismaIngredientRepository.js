import Ingredient from '../../Domains/Ingredients/Entities/Ingredient.js';
import IngredientRepository from '../../Domains/Ingredients/Repositories/IngredientRepository.js';

export default class PrismaIngredientRepository extends IngredientRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_INGREDIENT_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.ingredient.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => Ingredient.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.ingredient.findUnique({ where: { id } });
    return Ingredient.fromPersistence(record);
  }

  async createIngredient(ingredientData) {
    const record = await this._prisma.ingredient.create({ data: ingredientData });
    return Ingredient.fromPersistence(record);
  }

  async updateIngredient({ id, ingredientData }) {
    try {
      const record = await this._prisma.ingredient.update({ where: { id }, data: ingredientData });
      return Ingredient.fromPersistence(record);
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
