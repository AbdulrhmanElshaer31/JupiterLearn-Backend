const express = require("express");
const routes = express.Router();
const playlistController = require("./playlists.controller");
const validate = require("../../middlewares/validate.middleware");
const { createPlaylistSchema, updatePlaylistSchema } = require("../../middlewares/validations/playlist.validation");

routes.get("/", playlistController.getAllPlaylists);
routes.get("/active", playlistController.getActivePlaylists);
routes.get("/inactive", playlistController.getInactivePlaylists);
routes.get("/grade/:gradeId", playlistController.getPlaylistsByGradeId);
routes.get("/stats/:playlistId", playlistController.getPlaylistStats);
routes.get("/stats/grade/:gradeId", playlistController.getGradePlaylistsStats);
routes.get("/:playlistId", playlistController.getPlaylistById);
routes.post("/", validate(createPlaylistSchema), playlistController.createPlaylist);
routes.put("/:playlistId", validate(updatePlaylistSchema), playlistController.updatePlaylist);
routes.delete("/:playlistId", playlistController.deletePlaylist);

module.exports = routes;