import OutletRepository from '../../../Domains/Outlets/Repositories/OutletRepository.js';

export default class OutletService {
  constructor({ outletRepository } = {}) {
    if (!outletRepository) {
      throw new Error('OUTLET_SERVICE.MISSING_REPOSITORY');
    }

    if (!(outletRepository instanceof OutletRepository)) {
      const requiredMethods = [
        'findAll',
        'findById',
        'createOutlet',
        'updateOutlet',
        'deleteOutlet',
      ];

      const missingMethod = requiredMethods.find(
        (method) => typeof outletRepository[method] !== 'function'
      );

      if (missingMethod) {
        throw new Error(`OUTLET_SERVICE.INVALID_REPOSITORY: missing ${missingMethod}`);
      }
    }

    this._outletRepository = outletRepository;
  }

  async listOutlets() {
    return this._outletRepository.findAll();
  }

  async getOutlet(id) {
    return this._outletRepository.findById(id);
  }

  async createOutlet(outletData) {
    return this._outletRepository.createOutlet(outletData);
  }

  async updateOutlet(payload) {
    return this._outletRepository.updateOutlet(payload);
  }

  async deleteOutlet(id) {
    return this._outletRepository.deleteOutlet(id);
  }
}
