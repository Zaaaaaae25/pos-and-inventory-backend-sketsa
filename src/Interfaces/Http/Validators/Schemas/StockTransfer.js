import Joi from 'joi';

const posInt = Joi.number().integer().positive();

export const createStockTransferSchema = Joi.object({
  ingredientId: posInt.required(),
  fromPlaceId: posInt.allow(null),
  toPlaceId: posInt.allow(null),
  qty: Joi.number().required(),
});

export default { create: createStockTransferSchema };

