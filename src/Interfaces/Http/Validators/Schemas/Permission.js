import Joi from 'joi';

const description = Joi.string().trim().allow(null).empty('');

export const createPermissionSchema = Joi.object({
  name: Joi.string().trim().lowercase().min(1).required(),
  description,
});

export const updatePermissionSchema = Joi.object({
  name: Joi.string().trim().lowercase().min(1),
  description,
}).min(1);

export default {
  create: createPermissionSchema,
  update: updatePermissionSchema,
};

