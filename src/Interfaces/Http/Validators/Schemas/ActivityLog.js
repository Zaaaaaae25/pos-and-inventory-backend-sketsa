import Joi from 'joi';

const positiveInt = Joi.number().integer().positive();
const nullableText = Joi.string().trim().allow(null).empty('');

export const createActivityLogSchema = Joi.object({
  userId: positiveInt.allow(null),
  action: Joi.string().trim().min(1).required(),
  entityType: nullableText,
  entityId: positiveInt.allow(null),
  contextJson: Joi.object().unknown(true).allow(null),
});

export default { create: createActivityLogSchema };

