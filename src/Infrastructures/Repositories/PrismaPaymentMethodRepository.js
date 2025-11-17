import PaymentMethod from '../../Domains/PaymentMethods/Entities/PaymentMethod.js';
import PaymentMethodRepository from '../../Domains/PaymentMethods/Repositories/PaymentMethodRepository.js';

export default class PrismaPaymentMethodRepository extends PaymentMethodRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_PAYMENTMETHOD_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.paymentMethod.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => PaymentMethod.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.paymentMethod.findUnique({ where: { id } });
    return PaymentMethod.fromPersistence(record);
  }

  async findByName(name) {
    if (!name) return null;
    const record = await this._prisma.paymentMethod.findUnique({ where: { name } });
    return PaymentMethod.fromPersistence(record);
  }

  async createPaymentMethod(data) {
    const record = await this._prisma.paymentMethod.create({ data });
    return PaymentMethod.fromPersistence(record);
  }

  async updatePaymentMethod({ id, data }) {
    try {
      const record = await this._prisma.paymentMethod.update({ where: { id }, data });
      return PaymentMethod.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deletePaymentMethod(id) {
    try {
      await this._prisma.paymentMethod.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
