import BaseActivityLogUsecase from './BaseActivityLogUsecase.js';

export default class ListActivityLogsUsecase extends BaseActivityLogUsecase { async execute(){ return this.activityLogService.listActivityLogs(); } }

