import BaseActivityLogUsecase from './BaseActivityLogUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class DeleteActivityLogUsecase extends BaseActivityLogUsecase { async execute(id){ const intId=this._toInt(id); const ok=await this.activityLogService.deleteActivityLog(intId); if(!ok) throw new ValidationError('Activity log not found'); return true; } }

