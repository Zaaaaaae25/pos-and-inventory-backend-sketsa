import Joi from 'joi';

const descriptionSchema = Joi.string().trim().allow(null).empty('');
const permissionNameSchema = Joi.string().trim().lowercase().min(1);

export const createRoleSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  description: descriptionSchema,
  permissions: Joi.array().items(permissionNameSchema).optional(),
});

export const updateRoleSchema = Joi.object({
  name: Joi.string().trim().min(1),
  description: descriptionSchema,
  permissions: Joi.array().items(permissionNameSchema).optional(),
}).min(1);

export default {
  create: createRoleSchema,
  update: updateRoleSchema,
};
