import Recipe from '../../Domains/Recipes/Entities/Recipe.js';
import RecipeRepository from '../../Domains/Recipes/Repositories/RecipeRepository.js';

export default class PrismaRecipeRepository extends RecipeRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_RECIPE_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.recipe.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => Recipe.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.recipe.findUnique({ where: { id } });
    return Recipe.fromPersistence(record);
  }

  async createRecipe(data) {
    const record = await this._prisma.recipe.create({ data });
    return Recipe.fromPersistence(record);
  }

  async updateRecipe({ id, data }) {
    try {
      const record = await this._prisma.recipe.update({ where: { id }, data });
      return Recipe.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteRecipe(id) {
    try {
      await this._prisma.recipe.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
