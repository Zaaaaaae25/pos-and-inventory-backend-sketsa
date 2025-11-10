import BaseSystemLogUsecase from './BaseSystemLogUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class GetSystemLogUsecase extends BaseSystemLogUsecase { async execute(id){ const intId=this._toInt(id); const rec=await this.systemLogService.getSystemLog(intId); if(!rec) throw new ValidationError('System log not found'); return rec; } }

