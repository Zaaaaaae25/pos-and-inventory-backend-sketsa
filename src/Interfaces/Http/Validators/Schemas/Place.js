import Joi from 'joi';

const nullableText = Joi.string().trim().allow(null).empty('');

export const createPlaceSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  address: nullableText,
  phone: nullableText,
  logoPath: nullableText,
  type: nullableText,
  isActive: Joi.boolean(),
});

export const updatePlaceSchema = Joi.object({
  name: Joi.string().trim().min(1),
  address: nullableText,
  phone: nullableText,
  logoPath: nullableText,
  type: nullableText,
  isActive: Joi.boolean(),
}).min(1);

export default {
  create: createPlaceSchema,
  update: updatePlaceSchema,
};
