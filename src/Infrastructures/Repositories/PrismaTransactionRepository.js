import TransactionRepository from '../../Domains/Transactions/Repositories/TransactionRepository.js';

export default class PrismaTransactionRepository extends TransactionRepository {
  constructor({ prisma } = {}) { super(); if (!prisma) throw new Error('PRISMA_TRANSACTION_REPOSITORY.MISSING_CLIENT'); this._prisma = prisma; }
  findAll() { return this._prisma.transaction.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.transaction.findUnique({ where: { id } }); }
  createTransaction(data) { return this._prisma.transaction.create({ data }); }
  async updateTransaction({ id, data }) { try { return await this._prisma.transaction.update({ where: { id }, data }); } catch (e) { if (e?.code === 'P2025') return null; throw e; } }
  async deleteTransaction(id) { try { await this._prisma.transaction.delete({ where: { id } }); return true; } catch (e) { if (e?.code === 'P2025') return false; throw e; } }
}

