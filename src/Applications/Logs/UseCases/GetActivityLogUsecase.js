import BaseActivityLogUsecase from './BaseActivityLogUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class GetActivityLogUsecase extends BaseActivityLogUsecase { async execute(id){ const intId=this._toInt(id); const rec=await this.activityLogService.getActivityLog(intId); if(!rec) throw new ValidationError('Activity log not found'); return rec; } }

