import Joi from 'joi';

const posInt = Joi.number().integer().positive();

export const createInventoryStockDailySchema = Joi.object({
  placeId: posInt.required(),
  ingredientId: posInt.required(),
  date: Joi.date().iso().required(),
  openingQty: Joi.number().required(),
  closingQty: Joi.number().required(),
  diffQty: Joi.number().allow(null),
});

export const updateInventoryStockDailySchema = Joi.object({
  placeId: posInt,
  ingredientId: posInt,
  date: Joi.date().iso(),
  openingQty: Joi.number(),
  closingQty: Joi.number(),
  diffQty: Joi.number().allow(null),
}).min(1);

export default { create: createInventoryStockDailySchema, update: updateInventoryStockDailySchema };

