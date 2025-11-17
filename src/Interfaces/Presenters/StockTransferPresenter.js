export default class StockTransferPresenter {
  present(record){ if(!record) return null; return { id: record.id, ingredientId: record.ingredientId, fromPlaceId: record.fromPlaceId ?? null, toPlaceId: record.toPlaceId ?? null, qty: Number(record.qty), createdAt: record.createdAt }; }
  presentCollection(records){ return records.map((r)=>this.present(r)); }
}

