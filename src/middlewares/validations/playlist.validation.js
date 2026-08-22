const Joi = require("joi");

const createPlaylistSchema = Joi.object({
  title: Joi.string().required().min(3).max(255),
  description: Joi.string().allow("", null).max(2000),
  grade_id: Joi.number().integer().required()
});

const updatePlaylistSchema = Joi.object({
  title: Joi.string().min(3).max(255),
  description: Joi.string().allow("", null).max(2000),
  grade_id: Joi.number().integer(),
  isActive: Joi.number().integer().valid(0, 1)
});

module.exports = {
  createPlaylistSchema,
  updatePlaylistSchema
};