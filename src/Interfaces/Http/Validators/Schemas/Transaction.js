import Joi from 'joi';

const posInt = Joi.number().integer().positive();
const nullableText = Joi.string().trim().allow(null).empty('');

export const createTransactionSchema = Joi.object({
  cashierId: posInt.required(),
  placeId: posInt.allow(null),
  tableId: posInt.allow(null),
  orderType: nullableText,
  total: Joi.number().required(),
  tax: Joi.number().allow(null),
  discount: Joi.number().allow(null),
  paymentMethodId: posInt.allow(null),
});

export const updateTransactionSchema = Joi.object({
  cashierId: posInt,
  placeId: posInt.allow(null),
  tableId: posInt.allow(null),
  orderType: nullableText,
  total: Joi.number(),
  tax: Joi.number().allow(null),
  discount: Joi.number().allow(null),
  paymentMethodId: posInt.allow(null),
}).min(1);

export default { create: createTransactionSchema, update: updateTransactionSchema };

