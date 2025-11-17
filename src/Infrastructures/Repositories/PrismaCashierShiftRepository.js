import CashierShift from '../../Domains/CashierShifts/Entities/CashierShift.js';
import CashierShiftRepository from '../../Domains/CashierShifts/Repositories/CashierShiftRepository.js';

export default class PrismaCashierShiftRepository extends CashierShiftRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_CASHIER_SHIFT_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.cashierShift.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => CashierShift.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.cashierShift.findUnique({ where: { id } });
    return CashierShift.fromPersistence(record);
  }

  async createShift(data) {
    const record = await this._prisma.cashierShift.create({ data });
    return CashierShift.fromPersistence(record);
  }

  async updateShift({ id, data }) {
    try {
      const record = await this._prisma.cashierShift.update({ where: { id }, data });
      return CashierShift.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteShift(id) {
    try {
      await this._prisma.cashierShift.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
