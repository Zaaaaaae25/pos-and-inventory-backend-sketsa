import Joi from 'joi';

const desc = Joi.string().trim().allow(null).empty('');

export const createPaymentMethodSchema = Joi.object({
  name: Joi.string().trim().lowercase().min(1).required(),
  description: desc,
  isActive: Joi.boolean(),
});

export const updatePaymentMethodSchema = Joi.object({
  name: Joi.string().trim().lowercase().min(1),
  description: desc,
  isActive: Joi.boolean(),
}).min(1);

export default { create: createPaymentMethodSchema, update: updatePaymentMethodSchema };

