import BaseSystemLogUsecase from './BaseSystemLogUsecase.js';
import ValidationError from '../../../Commons/Errors/ValidationError.js';

export default class CreateSystemLogUsecase extends BaseSystemLogUsecase {
  async execute(payload={}){ const message=String(payload.message??'').trim(); if(!message) throw new ValidationError('message is required'); const data={ message }; if(typeof payload.level!=='undefined') data.level = payload.level ?? null; if(typeof payload.contextJson!=='undefined') data.contextJson = payload.contextJson ?? null; return this.systemLogService.createSystemLog(data); }
}

