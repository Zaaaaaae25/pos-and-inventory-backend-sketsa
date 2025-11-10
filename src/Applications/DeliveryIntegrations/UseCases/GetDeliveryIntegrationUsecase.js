import BaseDeliveryIntegrationUsecase from './BaseDeliveryIntegrationUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class GetDeliveryIntegrationUsecase extends BaseDeliveryIntegrationUsecase {
  async execute(id){ const intId=this._toInt(id); const rec=await this.deliveryIntegrationService.getDeliveryIntegration(intId); if(!rec) throw new ValidationError('Delivery integration not found'); return rec; }
}

