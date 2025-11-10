import Joi from 'joi';

const positiveInt = Joi.number().integer().positive();
const nullableText = Joi.string().trim().allow(null).empty('');

export const createMenuSchema = Joi.object({
  placeId: positiveInt.allow(null),
  name: Joi.string().trim().min(1).required(),
  categoryId: positiveInt.allow(null),
  description: nullableText,
  isActive: Joi.boolean(),
});

export const updateMenuSchema = Joi.object({
  placeId: positiveInt.allow(null),
  name: Joi.string().trim().min(1),
  categoryId: positiveInt.allow(null),
  description: nullableText,
  isActive: Joi.boolean(),
}).min(1);

export default { create: createMenuSchema, update: updateMenuSchema };

