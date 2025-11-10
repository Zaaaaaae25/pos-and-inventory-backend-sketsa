import Joi from 'joi';

const nullableText = Joi.string().trim().allow(null).empty('');

export const createSystemLogSchema = Joi.object({
  level: nullableText,
  message: Joi.string().trim().min(1).required(),
  contextJson: Joi.object().unknown(true).allow(null),
});

export default { create: createSystemLogSchema };

