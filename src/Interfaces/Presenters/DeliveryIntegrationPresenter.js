export default class DeliveryIntegrationPresenter {
  present(model){ if(!model) return null; return { id:model.id, placeId:model.placeId, platformName:model.platformName, apiKey:model.apiKey ?? null, settingsJson:model.settingsJson ?? null }; }
  presentCollection(records=[]){ return records.map((r)=>this.present(r)); }
}

