import Joi from 'joi';

export const createCategorySchema = Joi.object({
  name: Joi.string().trim().lowercase().min(1).required(),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().trim().lowercase().min(1),
}).min(1);

export default {
  create: createCategorySchema,
  update: updateCategorySchema,
};

