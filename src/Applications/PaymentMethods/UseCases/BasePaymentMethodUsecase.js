import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class BasePaymentMethodUsecase {
  constructor({ paymentMethodService } = {}){ if(!paymentMethodService) throw new Error('PAYMENTMETHOD_USECASE.MISSING_SERVICE'); this.paymentMethodService = paymentMethodService; }
  _normalize(text){ return String(text ?? '').trim().toLowerCase(); }
  _toInt(v,name='id'){ const n=Number(v); if(!Number.isInteger(n)||n<=0) throw new ValidationError(`${name} must be a positive integer`); return n; }
  async _assertNameAvailable(name, ignoreId=null){ const normalized=this._normalize(name); if(!normalized) throw new ValidationError('Payment method name is required'); const existing=await this.paymentMethodService.getPaymentMethodByName(normalized); if(existing && existing.id!==ignoreId) throw new ValidationError(`Payment method ${normalized} already exists`); return normalized; }
}

