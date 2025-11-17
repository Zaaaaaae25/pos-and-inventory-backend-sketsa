import Promotion from '../../Domains/Promotions/Entities/Promotion.js';
import PromotionRepository from '../../Domains/Promotions/Repositories/PromotionRepository.js';

export default class PrismaPromotionRepository extends PromotionRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_PROMOTION_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.promotion.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => Promotion.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.promotion.findUnique({ where: { id } });
    return Promotion.fromPersistence(record);
  }

  async createPromotion(data) {
    const record = await this._prisma.promotion.create({ data });
    return Promotion.fromPersistence(record);
  }

  async updatePromotion({ id, data }) {
    try {
      const record = await this._prisma.promotion.update({ where: { id }, data });
      return Promotion.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deletePromotion(id) {
    try {
      await this._prisma.promotion.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
