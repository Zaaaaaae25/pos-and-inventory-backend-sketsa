import Joi from 'joi';

export const loginSchema = Joi.object({
  username: Joi.string().trim().min(1).required(),
  password: Joi.string().min(1).required(),
});

export default {
  login: loginSchema,
};
