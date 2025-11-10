import HttpStatus from '../../Commons/Constants/HttpStatus.js';

export default class DeliveryIntegrationController {
  constructor({
    deliveryIntegrationPresenter,
    listDeliveryIntegrationsUsecase,
    getDeliveryIntegrationUsecase,
    createDeliveryIntegrationUsecase,
    updateDeliveryIntegrationUsecase,
    deleteDeliveryIntegrationUsecase,
  }){
    if(!deliveryIntegrationPresenter) throw new Error('DeliveryIntegrationController requires a presenter');
    const deps=[
      ['listDeliveryIntegrationsUsecase',listDeliveryIntegrationsUsecase],
      ['getDeliveryIntegrationUsecase',getDeliveryIntegrationUsecase],
      ['createDeliveryIntegrationUsecase',createDeliveryIntegrationUsecase],
      ['updateDeliveryIntegrationUsecase',updateDeliveryIntegrationUsecase],
      ['deleteDeliveryIntegrationUsecase',deleteDeliveryIntegrationUsecase],
    ];
    const miss=deps.find(([,v])=>!v); if(miss) throw new Error(`DeliveryIntegrationController requires ${miss[0]}`);
    this.deliveryIntegrationPresenter=deliveryIntegrationPresenter;
    this.listDeliveryIntegrationsUsecase=listDeliveryIntegrationsUsecase;
    this.getDeliveryIntegrationUsecase=getDeliveryIntegrationUsecase;
    this.createDeliveryIntegrationUsecase=createDeliveryIntegrationUsecase;
    this.updateDeliveryIntegrationUsecase=updateDeliveryIntegrationUsecase;
    this.deleteDeliveryIntegrationUsecase=deleteDeliveryIntegrationUsecase;
  }

  async listDeliveryIntegrations(){ const recs=await this.listDeliveryIntegrationsUsecase.execute(); return { status: HttpStatus.OK, data: this.deliveryIntegrationPresenter.presentCollection(recs) }; }
  async getDeliveryIntegration({params}){ const rec=await this.getDeliveryIntegrationUsecase.execute(params.id); return { status: HttpStatus.OK, data: this.deliveryIntegrationPresenter.present(rec) }; }
  async createDeliveryIntegration({body}){ const rec=await this.createDeliveryIntegrationUsecase.execute(body); return { status: HttpStatus.CREATED, data: this.deliveryIntegrationPresenter.present(rec) }; }
  async updateDeliveryIntegration({params,body}){ const rec=await this.updateDeliveryIntegrationUsecase.execute(params.id, body); return { status: HttpStatus.OK, data: this.deliveryIntegrationPresenter.present(rec) }; }
  async deleteDeliveryIntegration({params}){ await this.deleteDeliveryIntegrationUsecase.execute(params.id); return { status: HttpStatus.NO_CONTENT }; }
}

