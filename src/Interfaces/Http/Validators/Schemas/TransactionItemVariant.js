import Joi from 'joi';

const posInt = Joi.number().integer().positive();

export const createTransactionItemVariantSchema = Joi.object({
  transactionItemId: posInt.required(),
  menuVariantId: posInt.required(),
  extraPrice: Joi.number().default(0),
});

export default { create: createTransactionItemVariantSchema };

