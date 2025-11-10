import BaseActivityLogUsecase from './BaseActivityLogUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class CreateActivityLogUsecase extends BaseActivityLogUsecase {
  async execute(payload={}){ const action=String(payload.action??'').trim(); if(!action) throw new ValidationError('action is required'); const data={ action }; if(typeof payload.userId!=='undefined') data.userId = payload.userId===null? null: Number(payload.userId); if(typeof payload.entityType!=='undefined') data.entityType = payload.entityType ?? null; if(typeof payload.entityId!=='undefined') data.entityId = payload.entityId===null? null: Number(payload.entityId); if(typeof payload.contextJson!=='undefined') data.contextJson = payload.contextJson ?? null; return this.activityLogService.createActivityLog(data); }
}

