import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BaseDeliveryIntegrationUsecase {
  constructor({ deliveryIntegrationService } = {}){ if(!deliveryIntegrationService) throw new Error('DELIVERYINTEGRATION_USECASE.MISSING_SERVICE'); this.deliveryIntegrationService = deliveryIntegrationService; }
  _toInt(v,name='id'){ const n=Number(v); if(!Number.isInteger(n)||n<=0) throw new ValidationError(`${name} must be a positive integer`); return n; }
}

