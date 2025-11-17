import Joi from 'joi';

const posInt = Joi.number().integer().positive();

export const createCashierShiftSchema = Joi.object({
  placeId: posInt.required(),
  cashierId: posInt.required(),
  ipAddress: Joi.string().required(),
  openingBalance: Joi.number(),
  status: Joi.string(),
});

export const updateCashierShiftSchema = Joi.object({
  closedAt: Joi.date().iso().allow(null),
  closingBalance: Joi.number().allow(null),
  systemBalance: Joi.number().allow(null),
  status: Joi.string(),
}).min(1);

export default { create: createCashierShiftSchema, update: updateCashierShiftSchema };

