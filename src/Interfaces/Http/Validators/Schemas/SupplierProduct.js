import Joi from 'joi';

const positiveInt = Joi.number().integer().positive();

export const createSupplierProductSchema = Joi.object({
  supplierId: positiveInt.required(),
  ingredientId: positiveInt.required(),
  packageId: positiveInt.required(),
  qty: Joi.number().positive().required(),
  price: Joi.number().min(0).required(),
  leadTime: Joi.number().integer().min(0).allow(null),
  isActive: Joi.boolean(),
});

export const updateSupplierProductSchema = Joi.object({
  supplierId: positiveInt,
  ingredientId: positiveInt,
  packageId: positiveInt,
  qty: Joi.number().positive(),
  price: Joi.number().min(0),
  leadTime: Joi.number().integer().min(0).allow(null),
  isActive: Joi.boolean(),
}).min(1);

export default {
  create: createSupplierProductSchema,
  update: updateSupplierProductSchema,
};

