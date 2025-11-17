import Joi from 'joi';

const posInt = Joi.number().integer().positive();

export const createPromotionRuleSchema = Joi.object({
  promotionId: posInt.required(),
  ruleType: Joi.string().trim().allow(null).empty(''),
  value: Joi.string().trim().allow(null).empty(''),
});

export default { create: createPromotionRuleSchema };

