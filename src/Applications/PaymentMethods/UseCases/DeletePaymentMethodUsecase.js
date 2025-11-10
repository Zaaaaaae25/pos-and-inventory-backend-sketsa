import BasePaymentMethodUsecase from './BasePaymentMethodUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class DeletePaymentMethodUsecase extends BasePaymentMethodUsecase {
  async execute(id){ const intId=this._toInt(id); const ok=await this.paymentMethodService.deletePaymentMethod(intId); if(!ok) throw new ValidationError('Payment method not found'); return true; }
}

