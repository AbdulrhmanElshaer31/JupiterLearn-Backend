const Joi = require("joi");

// Create payment
const createPaymentSchema = Joi.object({
  subscription_id: Joi.number().integer().positive().required(),
  student_id: Joi.number().integer().positive().required(),
  amount: Joi.number().positive().required(),
  payment_date: Joi.date().iso().required(),
  notes: Joi.string().allow("", null).max(1000),
});

// Update payment
const updatePaymentSchema = Joi.object({
  amount: Joi.number().positive().required(),
  payment_date: Joi.date().iso().required(),
  notes: Joi.string().allow("", null).max(1000),
});

module.exports = {
  createPaymentSchema,
  updatePaymentSchema,
};
