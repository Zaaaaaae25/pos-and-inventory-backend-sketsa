import BasePaymentMethodUsecase from './BasePaymentMethodUsecase.js';

export default class ListPaymentMethodsUsecase extends BasePaymentMethodUsecase {
  async execute(){ return this.paymentMethodService.listPaymentMethods(); }
}

