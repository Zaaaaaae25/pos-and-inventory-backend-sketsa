import Joi from 'joi';

const posInt = Joi.number().integer().positive();
const nullableText = Joi.string().trim().allow(null).empty('');

export const createKitchenOrderSchema = Joi.object({
  transactionItemId: posInt.required(),
  status: nullableText,
  startedAt: Joi.date().iso().allow(null),
  finishedAt: Joi.date().iso().allow(null),
  note: nullableText,
});

export const updateKitchenOrderSchema = Joi.object({
  transactionItemId: posInt,
  status: nullableText,
  startedAt: Joi.date().iso().allow(null),
  finishedAt: Joi.date().iso().allow(null),
  note: nullableText,
}).min(1);

export default { create: createKitchenOrderSchema, update: updateKitchenOrderSchema };

