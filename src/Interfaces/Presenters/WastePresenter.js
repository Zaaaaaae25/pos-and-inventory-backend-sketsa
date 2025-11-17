export default class WastePresenter {
  present(record){ if(!record) return null; return { id: record.id, ingredientId: record.ingredientId, placeId: record.placeId ?? null, qty: Number(record.qty), reason: record.reason ?? null, createdAt: record.createdAt }; }
  presentCollection(records){ return records.map((r)=>this.present(r)); }
}

