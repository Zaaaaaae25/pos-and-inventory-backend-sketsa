export default class PaymentMethodPresenter {
  present(model){ if(!model) return null; return { id:model.id, name:model.name, description:model.description ?? null, isActive:model.isActive }; }
  presentCollection(records=[]){ return records.map((r)=>this.present(r)); }
}

