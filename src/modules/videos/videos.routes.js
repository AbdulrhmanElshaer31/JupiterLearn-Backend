const express = require("express");
const routes = express.Router();
const videoController = require("./videos.controller");
const validate = require("../../middlewares/validate.middleware");
const { createVideoSchema, updateVideoSchema } = require("../../middlewares/validations/video.validation");

routes.get("/", videoController.getAllVideos);
routes.get("/active", videoController.getActiveVideos);
routes.get("/inactive", videoController.getInactiveVideos);
routes.get("/grade/:gradeId", videoController.getVideosByGradeId);
routes.get("/:videoId", videoController.getVideoById);
routes.post("/", validate(createVideoSchema), videoController.createVideo);
routes.put("/:videoId", validate(updateVideoSchema), videoController.updateVideo);
routes.delete("/:videoId", videoController.deleteVideo);

module.exports = routes;