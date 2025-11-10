export default class MenuVariantItemPresenter {
  present(model){ if(!model) return null; return { id:model.id, menuVariantId:model.menuVariantId, name:model.name, additionalPrice:Number(model.additionalPrice) }; }
  presentCollection(records=[]){ return records.map((r)=>this.present(r)); }
}

