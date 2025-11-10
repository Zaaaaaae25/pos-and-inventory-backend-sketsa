import Joi from 'joi';

const positiveInt = Joi.number().integer().positive();
const nullableText = Joi.string().trim().allow(null).empty('');

export const createDeliveryIntegrationSchema = Joi.object({
  placeId: positiveInt.required(),
  platformName: Joi.string().trim().min(1).required(),
  apiKey: nullableText,
  settingsJson: Joi.object().unknown(true).allow(null),
});

export const updateDeliveryIntegrationSchema = Joi.object({
  placeId: positiveInt,
  platformName: Joi.string().trim().min(1),
  apiKey: nullableText,
  settingsJson: Joi.object().unknown(true).allow(null),
}).min(1);

export default { create: createDeliveryIntegrationSchema, update: updateDeliveryIntegrationSchema };

