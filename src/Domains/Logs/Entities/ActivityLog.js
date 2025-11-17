export default class ActivityLog {
  constructor({
    id = null,
    userId = null,
    action,
    entityType = null,
    entityId = null,
    contextJson = null,
    createdAt,
  }) {
    this.id = id;
    this.userId = userId;
    this.action = action;
    this.entityType = entityType;
    this.entityId = entityId;
    this.contextJson = contextJson;
    this.createdAt = createdAt;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new ActivityLog({
      id: record.id ?? null,
      userId: record.userId ?? null,
      action: record.action,
      entityType: record.entityType ?? null,
      entityId: record.entityId ?? null,
      contextJson: record.contextJson ?? null,
      createdAt: record.createdAt,
    });
  }
}
