import Joi from 'joi';

const positiveInt = Joi.number().integer().positive();
const nullableText = Joi.string().trim().allow(null).empty('');

export const createReportFileSchema = Joi.object({
  reportType: Joi.string().trim().min(1).required(),
  reportScope: Joi.string().trim().min(1).required(),
  reportDate: Joi.date().iso().allow(null),
  placeId: positiveInt.allow(null),
  fileName: Joi.string().trim().min(1).required(),
  filePath: Joi.string().trim().min(1).required(),
});

export const updateReportFileSchema = Joi.object({
  reportType: Joi.string().trim().min(1),
  reportScope: Joi.string().trim().min(1),
  reportDate: Joi.date().iso().allow(null),
  placeId: positiveInt.allow(null),
  fileName: Joi.string().trim().min(1),
  filePath: Joi.string().trim().min(1),
}).min(1);

export default { create: createReportFileSchema, update: updateReportFileSchema };

