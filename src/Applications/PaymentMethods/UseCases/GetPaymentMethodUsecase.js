import BasePaymentMethodUsecase from './BasePaymentMethodUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class GetPaymentMethodUsecase extends BasePaymentMethodUsecase {
  async execute(id){ const intId=this._toInt(id); const rec=await this.paymentMethodService.getPaymentMethod(intId); if(!rec) throw new ValidationError('Payment method not found'); return rec; }
}

