import BasePaymentMethodUsecase from './BasePaymentMethodUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class UpdatePaymentMethodUsecase extends BasePaymentMethodUsecase {
  async execute(id,payload={}){ const intId=this._toInt(id); const data={}; if(typeof payload.name!=='undefined') data.name=await this._assertNameAvailable(payload.name,intId); if(typeof payload.description!=='undefined') data.description=payload.description ?? null; if(typeof payload.isActive==='boolean') data.isActive=payload.isActive; if(Object.keys(data).length===0) throw new ValidationError('No valid fields to update'); const rec=await this.paymentMethodService.updatePaymentMethod({ id:intId, data }); if(!rec) throw new ValidationError('Payment method not found'); return rec; }
}

