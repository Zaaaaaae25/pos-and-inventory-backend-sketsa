import BaseDeliveryIntegrationUsecase from './BaseDeliveryIntegrationUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class UpdateDeliveryIntegrationUsecase extends BaseDeliveryIntegrationUsecase {
  async execute(id,payload={}){
    const intId=this._toInt(id);
    const data={};
    if(typeof payload.placeId!=='undefined') data.placeId=this._toInt(payload.placeId,'placeId');
    if(typeof payload.platformName!=='undefined') data.platformName=String(payload.platformName).trim();
    if(typeof payload.apiKey!=='undefined') data.apiKey=payload.apiKey ?? null;
    if(typeof payload.settingsJson!=='undefined') data.settingsJson=payload.settingsJson ?? null;
    if(Object.keys(data).length===0) throw new ValidationError('No valid fields to update');
    const rec=await this.deliveryIntegrationService.updateDeliveryIntegration({ id:intId, data });
    if(!rec) throw new ValidationError('Delivery integration not found');
    return rec;
  }
}

