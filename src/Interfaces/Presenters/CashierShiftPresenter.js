export default class CashierShiftPresenter {
  present(record){ if(!record) return null; return { id: record.id, placeId: record.placeId, cashierId: record.cashierId, openedAt: record.openedAt, closedAt: record.closedAt ?? null, openingBalance: Number(record.openingBalance ?? 0), closingBalance: record.closingBalance == null ? null : Number(record.closingBalance), systemBalance: record.systemBalance == null ? null : Number(record.systemBalance), ipAddress: record.ipAddress, status: record.status }; }
  presentCollection(records){ return records.map((r)=>this.present(r)); }
}

