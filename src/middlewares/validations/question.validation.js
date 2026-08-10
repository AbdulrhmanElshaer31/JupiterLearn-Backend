const Joi = require("joi");

const createQuestionSchema = Joi.object({
  examId: Joi.number().integer().required(),
  questionText: Joi.string().required().min(1).max(2000),
  type: Joi.string().required().valid("mcq", "true_false", "essay"),
  order: Joi.number().integer().required().min(1)
});

const updateQuestionSchema = Joi.object({
  questionText: Joi.string().min(1).max(2000),
  type: Joi.string().valid("mcq", "true_false", "essay"),
  order: Joi.number().integer().min(1)
});

module.exports = {
  createQuestionSchema,
  updateQuestionSchema
};