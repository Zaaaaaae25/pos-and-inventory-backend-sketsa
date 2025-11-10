import RecipeRepository from '../../Domains/Recipes/Repositories/RecipeRepository.js';

export default class PrismaRecipeRepository extends RecipeRepository {
  constructor({ prisma } = {}) { super(); if (!prisma) throw new Error('PRISMA_RECIPE_REPOSITORY.MISSING_CLIENT'); this._prisma = prisma; }
  findAll() { return this._prisma.recipe.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.recipe.findUnique({ where: { id } }); }
  createRecipe(data) { return this._prisma.recipe.create({ data }); }
  async updateRecipe({ id, data }) { try { return await this._prisma.recipe.update({ where: { id }, data }); } catch(e){ if(e?.code==='P2025') return null; throw e; } }
  async deleteRecipe(id) { try { await this._prisma.recipe.delete({ where: { id } }); return true; } catch(e){ if(e?.code==='P2025') return false; throw e; } }
}

