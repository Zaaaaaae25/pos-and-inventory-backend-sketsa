import Joi from 'joi';

const posInt = Joi.number().integer().positive();

export const createPlaceStockSchema = Joi.object({
  placeId: posInt.required(),
  ingredientId: posInt.required(),
  qty: Joi.number().required(),
  unitId: posInt.required(),
});

export const updatePlaceStockSchema = Joi.object({
  placeId: posInt,
  ingredientId: posInt,
  qty: Joi.number(),
  unitId: posInt,
}).min(1);

export default { create: createPlaceStockSchema, update: updatePlaceStockSchema };

