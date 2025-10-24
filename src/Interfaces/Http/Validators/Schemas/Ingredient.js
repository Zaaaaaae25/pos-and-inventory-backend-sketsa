import Joi from 'joi';

const positiveInt = Joi.number().integer().positive();

export const createIngredientSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  unitId: positiveInt.required(),
});

export const updateIngredientSchema = Joi.object({
  name: Joi.string().trim().min(1),
  unitId: positiveInt,
}).min(1);

export default {
  create: createIngredientSchema,
  update: updateIngredientSchema,
};

