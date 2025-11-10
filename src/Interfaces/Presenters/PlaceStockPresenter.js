export default class PlaceStockPresenter {
  present(record){ if(!record) return null; return { id: record.id, placeId: record.placeId, ingredientId: record.ingredientId, qty: Number(record.qty ?? 0), unitId: record.unitId }; }
  presentCollection(records){ return records.map((r)=>this.present(r)); }
}

