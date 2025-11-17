export default class DeliveryIntegration {
  constructor({
    id = null,
    placeId,
    platformName,
    apiKey = null,
    settingsJson = null,
  }) {
    this.id = id;
    this.placeId = placeId;
    this.platformName = platformName;
    this.apiKey = apiKey;
    this.settingsJson = settingsJson;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new DeliveryIntegration({
      id: record.id ?? null,
      placeId: record.placeId,
      platformName: record.platformName,
      apiKey: record.apiKey ?? null,
      settingsJson: record.settingsJson ?? null,
    });
  }
}
