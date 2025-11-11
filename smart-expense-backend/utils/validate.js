const Joi = require('joi');

const signupValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{6,30}$'))
      .required()
      .messages({
        'string.pattern.base': 'Password must be 6-30 characters, include letters, numbers, and special characters',
      }),
    role: Joi.string().valid('user', 'admin', 'superadmin'),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

const expenseValidation = (data) => {
  const schema = Joi.object({
    amount: Joi.number().positive().required(),
    category: Joi.string().min(2).max(50).required(),
    description: Joi.string().max(255).allow('', null),
    date: Joi.date().optional(),
  });
  return schema.validate(data);
};

module.exports = { signupValidation, loginValidation, expenseValidation };
