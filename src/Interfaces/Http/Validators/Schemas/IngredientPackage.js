import Joi from 'joi';

const positiveInt = Joi.number().integer().positive();

export const createIngredientPackageSchema = Joi.object({
  ingredientId: positiveInt.required(),
  packageId: positiveInt.required(),
  qty: Joi.number().positive().required(),
});

export const updateIngredientPackageSchema = Joi.object({
  ingredientId: positiveInt,
  packageId: positiveInt,
  qty: Joi.number().positive(),
}).min(1);

export default {
  create: createIngredientPackageSchema,
  update: updateIngredientPackageSchema,
};

