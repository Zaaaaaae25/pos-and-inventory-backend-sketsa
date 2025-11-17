import Joi from 'joi';

const posInt = Joi.number().integer().positive();
const nullableText = Joi.string().trim().allow(null).empty('');

export const createPromotionSchema = Joi.object({
  placeId: posInt.allow(null),
  name: Joi.string().trim().min(1).required(),
  startAt: Joi.date().iso().allow(null),
  endAt: Joi.date().iso().allow(null),
});

export const updatePromotionSchema = Joi.object({
  placeId: posInt.allow(null),
  name: Joi.string().trim().min(1),
  startAt: Joi.date().iso().allow(null),
  endAt: Joi.date().iso().allow(null),
}).min(1);

export default { create: createPromotionSchema, update: updatePromotionSchema };

