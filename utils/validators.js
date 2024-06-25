const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  age: Joi.number().required(),
  city: Joi.string().required(),
  zipCode: Joi.string().length(5).pattern(/^[0-9]+$/).required(),
});

const idSchema = Joi.string().length(24).required();

const validateUser = (userData, partial = false) => {
  return userSchema.validateAsync(userData, { presence: partial ? 'optional' : 'required' });
};

const validateId = (id) => {
  return idSchema.validateAsync(id);
};

module.exports = {
  validateUser,
  validateId,
};
