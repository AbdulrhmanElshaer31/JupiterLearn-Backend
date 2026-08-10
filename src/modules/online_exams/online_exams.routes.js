const express = require("express");
const routes = express.Router();
const onlineExamController = require("./online_exams.controller");
const validate = require("../../middlewares/validate.middleware");
const {
  createOnlineExamSchema,
  updateOnlineExamSchema,
} = require("../../middlewares/validations/onlineExam.validation");

routes.get("/", onlineExamController.getAllOnlineExams);
routes.get("/:examId", onlineExamController.getOnlineExamById);
routes.get("/grade/:gradeId", onlineExamController.getOnlineExamsByGradeId);
routes.get("/group/:groupId", onlineExamController.getOnlineExamsByGroupId);
routes.get("/stats/:examId", onlineExamController.getOnlineExamStats);
routes.get(
  "/stats/grade/:gradeId",
  onlineExamController.getGradeOnlineExamStats,
);
routes.post(
  "/",
  validate(createOnlineExamSchema),
  onlineExamController.createOnlineExam,
);
routes.put(
  "/:examId",
  validate(updateOnlineExamSchema),
  onlineExamController.updateOnlineExam,
);
routes.delete("/:examId", onlineExamController.deleteOnlineExam);

module.exports = routes;
