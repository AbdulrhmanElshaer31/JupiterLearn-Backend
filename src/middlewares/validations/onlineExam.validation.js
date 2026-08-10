const Joi = require("joi");

const createOnlineExamSchema = Joi.object({
  title: Joi.string().required().min(3).max(255),
  description: Joi.string().allow("", null).max(1000),
  gradeId: Joi.number().integer().required(),
  groupId: Joi.number().integer().allow(null),
  durationMinutes: Joi.number().integer().required().min(1).max(300),
  startAt: Joi.date().iso().required(),
  endAt: Joi.date().iso().required().greater(Joi.ref("startAt")),
  fullMark: Joi.number().required().min(1).max(999),
  randomizeQuestions: Joi.number().integer().valid(0, 1).default(0)
});

const updateOnlineExamSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  description: Joi.string().allow("", null).max(1000),
  gradeId: Joi.number().integer(),
  groupId: Joi.number().integer().allow(null),
  durationMinutes: Joi.number().integer().min(1).max(300),
  startAt: Joi.date().iso(),
  endAt: Joi.date().iso(),
  fullMark: Joi.number().min(1).max(999),
  randomizeQuestions: Joi.number().integer().valid(0, 1)
});

module.exports = {
  createOnlineExamSchema,
  updateOnlineExamSchema
};