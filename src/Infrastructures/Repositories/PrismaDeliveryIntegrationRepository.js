import DeliveryIntegration from '../../Domains/DeliveryIntegrations/Entities/DeliveryIntegration.js';
import DeliveryIntegrationRepository from '../../Domains/DeliveryIntegrations/Repositories/DeliveryIntegrationRepository.js';

export default class PrismaDeliveryIntegrationRepository extends DeliveryIntegrationRepository {
  constructor({ prisma } = {}) {
    super();
    if (!prisma) throw new Error('PRISMA_DELIVERYINTEGRATION_REPOSITORY.MISSING_CLIENT');
    this._prisma = prisma;
  }

  async findAll() {
    const records = await this._prisma.deliveryIntegration.findMany({ orderBy: { id: 'asc' } });
    return records.map((record) => DeliveryIntegration.fromPersistence(record));
  }

  async findById(id) {
    const record = await this._prisma.deliveryIntegration.findUnique({ where: { id } });
    return DeliveryIntegration.fromPersistence(record);
  }

  async createDeliveryIntegration(data) {
    const record = await this._prisma.deliveryIntegration.create({ data });
    return DeliveryIntegration.fromPersistence(record);
  }

  async updateDeliveryIntegration({ id, data }) {
    try {
      const record = await this._prisma.deliveryIntegration.update({ where: { id }, data });
      return DeliveryIntegration.fromPersistence(record);
    } catch (error) {
      if (error?.code === 'P2025') return null;
      throw error;
    }
  }

  async deleteDeliveryIntegration(id) {
    try {
      await this._prisma.deliveryIntegration.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === 'P2025') return false;
      throw error;
    }
  }
}
