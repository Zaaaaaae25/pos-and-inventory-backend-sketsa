import Joi from 'joi';

const positiveInt = Joi.number().integer().positive();

export const createMenuVariantSchema = Joi.object({
  menuId: positiveInt.required(),
  name: Joi.string().trim().min(1).required(),
});

export const updateMenuVariantSchema = Joi.object({
  menuId: positiveInt,
  name: Joi.string().trim().min(1),
}).min(1);

export default { create: createMenuVariantSchema, update: updateMenuVariantSchema };

