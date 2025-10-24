import Joi from 'joi';

const nullableText = Joi.string().trim().allow(null).empty('');

export const createPackageSchema = Joi.object({
  name: Joi.string().trim().lowercase().min(1).required(),
  description: nullableText,
});

export const updatePackageSchema = Joi.object({
  name: Joi.string().trim().lowercase().min(1),
  description: nullableText,
}).min(1);

export default {
  create: createPackageSchema,
  update: updatePackageSchema,
};

