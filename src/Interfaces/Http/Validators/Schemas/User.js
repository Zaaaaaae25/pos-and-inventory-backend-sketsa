import Joi from 'joi';

const positiveInteger = Joi.number().integer().positive();
const optionalText = Joi.string().trim().allow(null).empty('');

export const createUserSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  roleName: Joi.string().trim().min(1).required(),
  email: Joi.string().trim().lowercase().email({ tlds: { allow: false } }).allow(null).empty(''),
  password: Joi.string().min(8).allow(null).empty(''),
  status: optionalText,
  placeId: positiveInteger.allow(null),
  outletId: positiveInteger.allow(null),
  pin: Joi.string().pattern(/^\d{4,6}$/).allow(null).empty(''),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(1),
  roleName: Joi.string().trim().min(1),
  email: Joi.string().trim().lowercase().email({ tlds: { allow: false } }).allow(null).empty(''),
  password: Joi.string().min(8).allow(null).empty(''),
  status: optionalText,
  placeId: positiveInteger.allow(null),
  outletId: positiveInteger.allow(null),
  pin: Joi.string().pattern(/^\d{4,6}$/).allow(null).empty(''),
}).min(1);

export default {
  create: createUserSchema,
  update: updateUserSchema,
};
