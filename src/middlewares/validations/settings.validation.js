const Joi = require("joi");

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().min(4).max(100),
  newPassword: Joi.string().required().min(4).max(100),
  confirmPassword: Joi.string().required().valid(Joi.ref("newPassword"))
});

module.exports = {
  changePasswordSchema
};