import Joi from 'joi';

const nullableText = Joi.string().trim().allow(null).empty('');

export const createSupplierSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  contactName: nullableText,
  phone: nullableText,
  email: nullableText,
  address: nullableText,
});

export const updateSupplierSchema = Joi.object({
  name: Joi.string().trim().min(1),
  contactName: nullableText,
  phone: nullableText,
  email: nullableText,
  address: nullableText,
}).min(1);

export default {
  create: createSupplierSchema,
  update: updateSupplierSchema,
};

