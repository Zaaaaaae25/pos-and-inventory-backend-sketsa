import TransactionItemRepository from '../../Domains/Transactions/Repositories/TransactionItemRepository.js';

export default class PrismaTransactionItemRepository extends TransactionItemRepository {
  constructor({ prisma } = {}) { super(); if (!prisma) throw new Error('PRISMA_TRANSACTION_ITEM_REPOSITORY.MISSING_CLIENT'); this._prisma = prisma; }
  findAll() { return this._prisma.transactionItem.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.transactionItem.findUnique({ where: { id } }); }
  createItem(data) { return this._prisma.transactionItem.create({ data }); }
  async updateItem({ id, data }) { try { return await this._prisma.transactionItem.update({ where: { id }, data }); } catch (e) { if (e?.code === 'P2025') return null; throw e; } }
  async deleteItem(id) { try { await this._prisma.transactionItem.delete({ where: { id } }); return true; } catch (e) { if (e?.code === 'P2025') return false; throw e; } }
}

