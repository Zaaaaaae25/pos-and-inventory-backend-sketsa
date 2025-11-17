export default class ReportFile {
  constructor({
    id = null,
    reportType,
    reportScope,
    reportDate = null,
    placeId = null,
    fileName,
    filePath,
    createdAt,
  }) {
    this.id = id;
    this.reportType = reportType;
    this.reportScope = reportScope;
    this.reportDate = reportDate;
    this.placeId = placeId;
    this.fileName = fileName;
    this.filePath = filePath;
    this.createdAt = createdAt;
  }

  static fromPersistence(record) {
    if (!record) return null;
    return new ReportFile({
      id: record.id ?? null,
      reportType: record.reportType,
      reportScope: record.reportScope,
      reportDate: record.reportDate ?? null,
      placeId: record.placeId ?? null,
      fileName: record.fileName,
      filePath: record.filePath,
      createdAt: record.createdAt,
    });
  }
}
