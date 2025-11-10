import DeliveryIntegrationRepository from '../../Domains/DeliveryIntegrations/Repositories/DeliveryIntegrationRepository.js';

export default class PrismaDeliveryIntegrationRepository extends DeliveryIntegrationRepository {
  constructor({ prisma } = {}){ super(); if(!prisma) throw new Error('PRISMA_DELIVERYINTEGRATION_REPOSITORY.MISSING_CLIENT'); this._prisma=prisma; }
  findAll(){ return this._prisma.deliveryIntegration.findMany({ orderBy: { id: 'asc' } }); }
  findById(id){ return this._prisma.deliveryIntegration.findUnique({ where: { id } }); }
  createDeliveryIntegration(data){ return this._prisma.deliveryIntegration.create({ data }); }
  async updateDeliveryIntegration({ id, data }){ try { return await this._prisma.deliveryIntegration.update({ where: { id }, data }); } catch(e){ if(e?.code==='P2025') return null; throw e; } }
  async deleteDeliveryIntegration(id){ try { await this._prisma.deliveryIntegration.delete({ where: { id } }); return true; } catch(e){ if(e?.code==='P2025') return false; throw e; } }
}

