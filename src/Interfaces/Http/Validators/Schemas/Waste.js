import Joi from 'joi';

const posInt = Joi.number().integer().positive();

export const createWasteSchema = Joi.object({
  ingredientId: posInt.required(),
  placeId: posInt.allow(null),
  qty: Joi.number().required(),
  reason: Joi.string().allow(null, ''),
});

export const updateWasteSchema = Joi.object({
  ingredientId: posInt,
  placeId: posInt.allow(null),
  qty: Joi.number(),
  reason: Joi.string().allow(null, ''),
}).min(1);

export default { create: createWasteSchema, update: updateWasteSchema };

