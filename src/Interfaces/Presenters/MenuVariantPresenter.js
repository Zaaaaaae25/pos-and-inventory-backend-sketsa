export default class MenuVariantPresenter {
  present(model){ if(!model) return null; return { id:model.id, menuId:model.menuId, name:model.name }; }
  presentCollection(records=[]){ return records.map((r)=>this.present(r)); }
}

