import Joi from 'joi';

const posInt = Joi.number().integer().positive();

export const createTransactionItemSchema = Joi.object({
  transactionId: posInt.required(),
  menuId: posInt.required(),
  qty: posInt.required(),
  price: Joi.number().required(),
  discount: Joi.number().allow(null),
});

export const updateTransactionItemSchema = Joi.object({
  transactionId: posInt,
  menuId: posInt,
  qty: posInt,
  price: Joi.number(),
  discount: Joi.number().allow(null),
}).min(1);

export default { create: createTransactionItemSchema, update: updateTransactionItemSchema };

