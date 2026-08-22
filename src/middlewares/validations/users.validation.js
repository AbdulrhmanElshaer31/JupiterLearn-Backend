const Joi = require("joi");

// Create user
const createUserSchema = Joi.object({
  full_name: Joi.string().trim().min(3).max(255).required(),
  phone: Joi.string().trim().min(8).max(20).required(),
  password: Joi.string().min(4).max(100).required(),
  role: Joi.string().valid("super_admin", "assistant", "teacher").required(),
  permissions: Joi.string()
    .valid("online_management", "center_management")
    .required(),
});

// Update user
const updateUserSchema = Joi.object({
  full_name: Joi.string().trim().min(3).max(255),
  phone: Joi.string().trim().min(8).max(20),
  role: Joi.string().valid("super_admin", "assistant", "teacher"),
  permissions: Joi.string().valid("online_management", "center_management"),
}).min(1);

// Update user password
const updateUserPasswordSchema = Joi.object({
  password: Joi.string().min(4).max(100).required(),
});

// Find user by phone
const findUserByPhoneSchema = Joi.object({
  phone: Joi.string().trim().min(8).max(20).required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  updateUserPasswordSchema,
  findUserByPhoneSchema,
};
