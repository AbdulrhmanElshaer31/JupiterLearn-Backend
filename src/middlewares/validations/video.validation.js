const Joi = require("joi");

const createVideoSchema = Joi.object({
  title: Joi.string().required().min(3).max(255),
  description: Joi.string().allow("", null).max(2000),
  grade_id: Joi.number().integer().required(),
  youtube_url: Joi.string().required().uri().max(255)
});

const updateVideoSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  description: Joi.string().allow("", null).max(2000),
  grade_id: Joi.number().integer(),
  youtube_url: Joi.string().uri().max(255),
  isActive: Joi.number().integer().valid(0, 1)
});

module.exports = {
  createVideoSchema,
  updateVideoSchema
};