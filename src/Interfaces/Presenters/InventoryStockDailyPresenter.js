export default class InventoryStockDailyPresenter {
  present(record){ if(!record) return null; return { id: record.id, placeId: record.placeId, ingredientId: record.ingredientId, date: record.date, openingQty: Number(record.openingQty ?? 0), closingQty: Number(record.closingQty ?? 0), diffQty: record.diffQty == null ? null : Number(record.diffQty) }; }
  presentCollection(records){ return records.map((r)=>this.present(r)); }
}

