import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class PaymentMethodController {
  constructor({
    paymentMethodPresenter,
    listPaymentMethodsUsecase,
    getPaymentMethodUsecase,
    createPaymentMethodUsecase,
    updatePaymentMethodUsecase,
    deletePaymentMethodUsecase,
  }){
    if(!paymentMethodPresenter) throw new Error('PaymentMethodController requires a presenter');
    const deps=[
      ['listPaymentMethodsUsecase',listPaymentMethodsUsecase],
      ['getPaymentMethodUsecase',getPaymentMethodUsecase],
      ['createPaymentMethodUsecase',createPaymentMethodUsecase],
      ['updatePaymentMethodUsecase',updatePaymentMethodUsecase],
      ['deletePaymentMethodUsecase',deletePaymentMethodUsecase],
    ];
    const miss=deps.find(([,v])=>!v); if(miss) throw new Error(`PaymentMethodController requires ${miss[0]}`);
    this.paymentMethodPresenter=paymentMethodPresenter;
    this.listPaymentMethodsUsecase=listPaymentMethodsUsecase;
    this.getPaymentMethodUsecase=getPaymentMethodUsecase;
    this.createPaymentMethodUsecase=createPaymentMethodUsecase;
    this.updatePaymentMethodUsecase=updatePaymentMethodUsecase;
    this.deletePaymentMethodUsecase=deletePaymentMethodUsecase;
  }

  async listPaymentMethods(){ const recs=await this.listPaymentMethodsUsecase.execute(); return { status: HttpStatus.OK, data: this.paymentMethodPresenter.presentCollection(recs) }; }
  async getPaymentMethod({params}){ const rec=await this.getPaymentMethodUsecase.execute(params.id); return { status: HttpStatus.OK, data: this.paymentMethodPresenter.present(rec) }; }
  async createPaymentMethod({body}){ const rec=await this.createPaymentMethodUsecase.execute(body); return { status: HttpStatus.CREATED, data: this.paymentMethodPresenter.present(rec) }; }
  async updatePaymentMethod({params,body}){ const rec=await this.updatePaymentMethodUsecase.execute(params.id, body); return { status: HttpStatus.OK, data: this.paymentMethodPresenter.present(rec) }; }
  async deletePaymentMethod({params}){ await this.deletePaymentMethodUsecase.execute(params.id); return { status: HttpStatus.NO_CONTENT }; }
}

