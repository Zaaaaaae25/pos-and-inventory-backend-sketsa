import PaymentMethodRepository from '../../Domains/PaymentMethods/Repositories/PaymentMethodRepository.js';

export default class PrismaPaymentMethodRepository extends PaymentMethodRepository {
  constructor({ prisma } = {}){ super(); if(!prisma) throw new Error('PRISMA_PAYMENTMETHOD_REPOSITORY.MISSING_CLIENT'); this._prisma=prisma; }
  findAll(){ return this._prisma.paymentMethod.findMany({ orderBy: { id: 'asc' } }); }
  findById(id){ return this._prisma.paymentMethod.findUnique({ where: { id } }); }
  findByName(name){ if(!name) return null; return this._prisma.paymentMethod.findUnique({ where: { name } }); }
  createPaymentMethod(data){ return this._prisma.paymentMethod.create({ data }); }
  async updatePaymentMethod({ id, data }){ try { return await this._prisma.paymentMethod.update({ where: { id }, data }); } catch(e){ if(e?.code==='P2025') return null; throw e; } }
  async deletePaymentMethod(id){ try { await this._prisma.paymentMethod.delete({ where: { id } }); return true; } catch(e){ if(e?.code==='P2025') return false; throw e; } }
}

