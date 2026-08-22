const Joi = require("joi");

const addVideoToPlaylistSchema = Joi.object({
  playlist_id: Joi.number().integer().required(),
  video_id: Joi.number().integer().required()
});

module.exports = {
  addVideoToPlaylistSchema
};