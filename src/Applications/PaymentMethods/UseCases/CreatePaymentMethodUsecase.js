import BasePaymentMethodUsecase from './BasePaymentMethodUsecase.js';

export default class CreatePaymentMethodUsecase extends BasePaymentMethodUsecase {
  async execute(payload={}){ const name=await this._assertNameAvailable(payload?.name); const description = typeof payload.description==='undefined'? null: payload.description; const isActive = typeof payload.isActive==='boolean'? payload.isActive: true; return this.paymentMethodService.createPaymentMethod({ name, description, isActive }); }
}

