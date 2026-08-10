const Joi = require("joi");

const loginSchema = Joi.object({
  phone: Joi.string().required().min(8).max(20),
  password: Joi.string().required().min(4).max(100)
});

module.exports = {
  loginSchema
};