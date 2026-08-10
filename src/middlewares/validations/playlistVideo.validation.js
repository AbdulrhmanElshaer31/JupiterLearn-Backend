const Joi = require("joi");

const addVideoToPlaylistSchema = Joi.object({
  playlistId: Joi.number().integer().required(),
  videoId: Joi.number().integer().required()
});

module.exports = {
  addVideoToPlaylistSchema
};