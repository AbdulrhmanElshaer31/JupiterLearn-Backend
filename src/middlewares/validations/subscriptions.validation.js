const Joi = require("joi");

// Create subscription
const createSubscriptionSchema = Joi.object({
  student_id: Joi.number().integer().positive().required(),
  month: Joi.string().pattern(/^\d{4}-\d{2}$/).required(),
  required_amount: Joi.number().positive().required(),
});

// Update subscription status
const updateSubscriptionStatusSchema = Joi.object({
  status: Joi.string().valid("paid", "unpaid").required(),
});

module.exports = {
  createSubscriptionSchema,
  updateSubscriptionStatusSchema,
};