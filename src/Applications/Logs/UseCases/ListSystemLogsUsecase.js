import BaseSystemLogUsecase from './BaseSystemLogUsecase.js';

export default class ListSystemLogsUsecase extends BaseSystemLogUsecase { async execute(){ return this.systemLogService.listSystemLogs(); } }

