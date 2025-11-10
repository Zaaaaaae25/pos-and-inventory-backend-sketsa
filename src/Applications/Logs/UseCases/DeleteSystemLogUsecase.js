import BaseSystemLogUsecase from './BaseSystemLogUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class DeleteSystemLogUsecase extends BaseSystemLogUsecase { async execute(id){ const intId=this._toInt(id); const ok=await this.systemLogService.deleteSystemLog(intId); if(!ok) throw new ValidationError('System log not found'); return true; } }

