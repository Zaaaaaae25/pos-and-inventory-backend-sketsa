import BaseDeliveryIntegrationUsecase from './BaseDeliveryIntegrationUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class CreateDeliveryIntegrationUsecase extends BaseDeliveryIntegrationUsecase {
  async execute(payload={}){
    const placeId=this._toInt(payload.placeId,'placeId');
    const platformName=String(payload.platformName??'').trim();
    if(!platformName) throw new ValidationError('platformName is required');
    const data={ placeId, platformName };
    if(typeof payload.apiKey!=='undefined') data.apiKey=payload.apiKey ?? null;
    if(typeof payload.settingsJson!=='undefined') data.settingsJson=payload.settingsJson ?? null;
    return this.deliveryIntegrationService.createDeliveryIntegration(data);
  }
}

