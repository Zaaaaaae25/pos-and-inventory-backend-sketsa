import Joi from 'joi';

const positiveInt = Joi.number().integer().positive();

export const createRecipeSchema = Joi.object({
  menuId: positiveInt.required(),
  ingredientId: positiveInt.required(),
  qty: Joi.number().positive().required(),
});

export const updateRecipeSchema = Joi.object({
  menuId: positiveInt,
  ingredientId: positiveInt,
  qty: Joi.number().positive(),
}).min(1);

export default { create: createRecipeSchema, update: updateRecipeSchema };

