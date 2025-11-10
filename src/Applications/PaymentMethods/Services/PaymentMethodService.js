import PaymentMethodRepository from '../../../Domains/PaymentMethods/Repositories/PaymentMethodRepository.js';

export default class PaymentMethodService {
  constructor({ paymentMethodRepository } = {}){
    if(!paymentMethodRepository) throw new Error('PAYMENTMETHOD_SERVICE.MISSING_REPOSITORY');
    if(!(paymentMethodRepository instanceof PaymentMethodRepository)){
      const methods=['findAll','findById','findByName','createPaymentMethod','updatePaymentMethod','deletePaymentMethod'];
      const missing=methods.find((m)=>typeof paymentMethodRepository[m] !== 'function');
      if(missing) throw new Error(`PAYMENTMETHOD_SERVICE.INVALID_REPOSITORY: missing ${missing}`);
    }
    this._repo=paymentMethodRepository;
  }
  listPaymentMethods(){ return this._repo.findAll(); }
  getPaymentMethod(id){ return this._repo.findById(id); }
  getPaymentMethodByName(name){ return this._repo.findByName(name); }
  createPaymentMethod(data){ return this._repo.createPaymentMethod(data); }
  updatePaymentMethod(payload){ return this._repo.updatePaymentMethod(payload); }
  deletePaymentMethod(id){ return this._repo.deletePaymentMethod(id); }
}

