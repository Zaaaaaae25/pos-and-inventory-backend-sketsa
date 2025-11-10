import TransactionItemVariantRepository from '../../Domains/Transactions/Repositories/TransactionItemVariantRepository.js';

export default class PrismaTransactionItemVariantRepository extends TransactionItemVariantRepository {
  constructor({ prisma } = {}) { super(); if (!prisma) throw new Error('PRISMA_TRANSACTION_ITEM_VARIANT_REPOSITORY.MISSING_CLIENT'); this._prisma = prisma; }
  findAll() { return this._prisma.transactionItemVariant.findMany({ orderBy: { id: 'asc' } }); }
  findById(id) { return this._prisma.transactionItemVariant.findUnique({ where: { id } }); }
  createVariant(data) { return this._prisma.transactionItemVariant.create({ data }); }
  async deleteVariant(id) { try { await this._prisma.transactionItemVariant.delete({ where: { id } }); return true; } catch (e) { if (e?.code==='P2025') return false; throw e; } }
}

