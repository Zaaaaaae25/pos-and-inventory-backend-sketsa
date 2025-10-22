import ValidationError from '../../../Commons/Errors/ValidationError.js';

const defaultOptions = {
  abortEarly: false,
  stripUnknown: true,
  convert: true,
  errors: { wrap: { label: '' } },
};

function formatJoiErrors(details = []) {
  return details.map((detail) => ({
    message: detail.message,
    path: detail.path.join('.') || null,
    type: detail.type,
  }));
}

export default function validateRequest(schemas = {}) {
  const { body = null, params = null, query = null } = schemas;

  return async (req, _res, next) => {
    try {
      if (body) {
        const value = await body.validateAsync(req.body ?? {}, defaultOptions);
        req.body = value;
      }

      if (params) {
        const value = await params.validateAsync(req.params ?? {}, defaultOptions);
        req.params = value;
      }

      if (query) {
        const value = await query.validateAsync(req.query ?? {}, defaultOptions);
        req.query = value;
      }

      next();
    } catch (error) {
      if (error?.isJoi) {
        next(new ValidationError('Request validation failed', formatJoiErrors(error.details)));
        return;
      }

      next(error);
    }
  };
}
