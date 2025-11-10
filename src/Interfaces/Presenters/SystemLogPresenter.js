export default class SystemLogPresenter {
  present(model){ if(!model) return null; return { id:model.id, level:model.level ?? null, message:model.message, contextJson:model.contextJson ?? null, createdAt: model.createdAt ? new Date(model.createdAt).toISOString() : undefined }; }
  presentCollection(records=[]){ return records.map((r)=>this.present(r)); }
}

