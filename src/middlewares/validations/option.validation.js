const Joi = require("joi");

const createOptionSchema = Joi.object({
  question_id: Joi.number().integer().required(),
  option_text: Joi.string().required().min(1).max(255),
  isCorrect: Joi.number().integer().valid(0, 1).required(),
  order: Joi.number().integer().required().min(1)
});

const updateOptionSchema = Joi.object({
  option_text: Joi.string().min(1).max(255),
  isCorrect: Joi.number().integer().valid(0, 1),
  order: Joi.number().integer().min(1)
});

module.exports = {
  createOptionSchema,
  updateOptionSchema
};