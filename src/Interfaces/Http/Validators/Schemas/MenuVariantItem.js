import Joi from 'joi';

const positiveInt = Joi.number().integer().positive();

export const createMenuVariantItemSchema = Joi.object({
  menuVariantId: positiveInt.required(),
  name: Joi.string().trim().min(1).required(),
  additionalPrice: Joi.number().min(0).default(0),
});

export const updateMenuVariantItemSchema = Joi.object({
  menuVariantId: positiveInt,
  name: Joi.string().trim().min(1),
  additionalPrice: Joi.number().min(0),
}).min(1);

export default { create: createMenuVariantItemSchema, update: updateMenuVariantItemSchema };

