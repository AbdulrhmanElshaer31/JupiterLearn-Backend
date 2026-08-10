const express = require("express");
const routes = express.Router();
const questionController = require("./questions.controller");
const validate = require("../../middlewares/validate.middleware");
const {
  createQuestionSchema,
  updateQuestionSchema,
} = require("../../middlewares/validations/question.validation");

routes.get("/exam/:examId", questionController.getQuestionsByExamId);
routes.get("/:questionId", questionController.getQuestionById);
routes.post(
  "/",
  validate(createQuestionSchema),
  questionController.createQuestion,
);
routes.put(
  "/:questionId",
  validate(updateQuestionSchema),
  questionController.updateQuestion,
);
routes.delete("/:questionId", questionController.deleteQuestion);

module.exports = routes;
