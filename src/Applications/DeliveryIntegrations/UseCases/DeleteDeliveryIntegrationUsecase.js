import BaseDeliveryIntegrationUsecase from './BaseDeliveryIntegrationUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class DeleteDeliveryIntegrationUsecase extends BaseDeliveryIntegrationUsecase {
  async execute(id){ const intId=this._toInt(id); const ok=await this.deliveryIntegrationService.deleteDeliveryIntegration(intId); if(!ok) throw new ValidationError('Delivery integration not found'); return true; }
}

