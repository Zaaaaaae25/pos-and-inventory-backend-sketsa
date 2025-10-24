import Joi from 'joi';

export const createUnitSchema = Joi.object({
  name: Joi.string().trim().lowercase().min(1).required(),
  abbreviation: Joi.string().trim().lowercase().min(1).required(),
});

export const updateUnitSchema = Joi.object({
  name: Joi.string().trim().lowercase().min(1),
  abbreviation: Joi.string().trim().lowercase().min(1),
}).min(1);

export default {
  create: createUnitSchema,
  update: updateUnitSchema,
};

