export default class SystemLog {
  constructor({ id = null, level = null, message, contextJson = null, createdAt }) {
    this.id = id;
    this.level = level;
    this.message = message;
    this.contextJson = contextJson;
    this.createdAt = createdAt;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new SystemLog({
      id: record.id ?? null,
      level: record.level ?? null,
      message: record.message,
      contextJson: record.contextJson ?? null,
      createdAt: record.createdAt,
    });
  }
}
