export default class PromotionPresenter {
  present(record){ if(!record) return null; return { id: record.id, placeId: record.placeId ?? null, name: record.name, startAt: record.startAt, endAt: record.endAt }; }
  presentCollection(records){ return records.map((r)=>this.present(r)); }
}

