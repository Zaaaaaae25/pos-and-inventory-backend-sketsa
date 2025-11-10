import DeliveryIntegrationRepository from '../../../Domains/DeliveryIntegrations/Repositories/DeliveryIntegrationRepository.js';

export default class DeliveryIntegrationService {
  constructor({ deliveryIntegrationRepository } = {}){
    if(!deliveryIntegrationRepository) throw new Error('DELIVERYINTEGRATION_SERVICE.MISSING_REPOSITORY');
    if(!(deliveryIntegrationRepository instanceof DeliveryIntegrationRepository)){
      const methods=['findAll','findById','createDeliveryIntegration','updateDeliveryIntegration','deleteDeliveryIntegration'];
      const missing=methods.find((m)=>typeof deliveryIntegrationRepository[m] !== 'function');
      if(missing) throw new Error(`DELIVERYINTEGRATION_SERVICE.INVALID_REPOSITORY: missing ${missing}`);
    }
    this._repo=deliveryIntegrationRepository;
  }
  listDeliveryIntegrations(){ return this._repo.findAll(); }
  getDeliveryIntegration(id){ return this._repo.findById(id); }
  createDeliveryIntegration(data){ return this._repo.createDeliveryIntegration(data); }
  updateDeliveryIntegration(payload){ return this._repo.updateDeliveryIntegration(payload); }
  deleteDeliveryIntegration(id){ return this._repo.deleteDeliveryIntegration(id); }
}

