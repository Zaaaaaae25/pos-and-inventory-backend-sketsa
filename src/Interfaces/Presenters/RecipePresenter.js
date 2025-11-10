export default class RecipePresenter {
  present(model){ if(!model) return null; return { id:model.id, menuId:model.menuId, ingredientId:model.ingredientId, qty:Number(model.qty) }; }
  presentCollection(records=[]){ return records.map((r)=>this.present(r)); }
}

