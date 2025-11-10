import BaseDeliveryIntegrationUsecase from './BaseDeliveryIntegrationUsecase.js';

export default class ListDeliveryIntegrationsUsecase extends BaseDeliveryIntegrationUsecase {
  async execute(){ return this.deliveryIntegrationService.listDeliveryIntegrations(); }
}

