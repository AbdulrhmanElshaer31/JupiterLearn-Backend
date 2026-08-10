const express = require("express");
const routes = express.Router();
const playlistVideoController = require("./playlist_videos.controller");
const validate = require("../../middlewares/validate.middleware");
const {
  addVideoToPlaylistSchema,
} = require("../../middlewares/validations/playlistVideo.validation");

routes.get("/playlist/:playlistId", playlistVideoController.getPlaylistVideos);
routes.post(
  "/",
  validate(addVideoToPlaylistSchema),
  playlistVideoController.addVideoToPlaylist,
);
routes.delete("/:id", playlistVideoController.removeVideoFromPlaylist);

module.exports = routes;
