export default class ActivityLogPresenter {
  present(model){ if(!model) return null; return { id:model.id, userId:model.userId ?? null, action:model.action, entityType:model.entityType ?? null, entityId:model.entityId ?? null, contextJson:model.contextJson ?? null, createdAt: model.createdAt ? new Date(model.createdAt).toISOString() : undefined }; }
  presentCollection(records=[]){ return records.map((r)=>this.present(r)); }
}

