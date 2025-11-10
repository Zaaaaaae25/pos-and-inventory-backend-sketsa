import Joi from 'joi';

const positiveInt = Joi.number().integer().positive();

export const createMenuPriceSchema = Joi.object({
  menuId: positiveInt.required(),
  price: Joi.number().required(),
  effectiveDate: Joi.date().iso().required(),
});

export const updateMenuPriceSchema = Joi.object({
  menuId: positiveInt,
  price: Joi.number(),
  effectiveDate: Joi.date().iso(),
}).min(1);

export default { create: createMenuPriceSchema, update: updateMenuPriceSchema };

