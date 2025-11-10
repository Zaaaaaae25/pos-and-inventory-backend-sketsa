export default class ReportFilePresenter {
  present(model){ if(!model) return null; return { id:model.id, reportType:model.reportType, reportScope:model.reportScope, reportDate: model.reportDate ? new Date(model.reportDate).toISOString() : null, placeId:model.placeId ?? null, fileName:model.fileName, filePath:model.filePath, createdAt: model.createdAt ? new Date(model.createdAt).toISOString() : undefined }; }
  presentCollection(records=[]){ return records.map((r)=>this.present(r)); }
}

