const express = require("express");
const routes = express.Router();
const examResultController = require("./exam_results.controller");
const validate = require("../../middlewares/validate.middleware");
const {
  createExamResultSchema,
  upsertExamResultSchema,
  upsertBatchSchema,
  updateExamResultSchema,
} = require("../../middlewares/validations/examResults.validation");

// Create exam result
routes.post(
  "/",
  validate(createExamResultSchema),
  examResultController.createExamResult,
);

// Upsert exam result
routes.post(
  "/upsert",
  validate(upsertExamResultSchema),
  examResultController.upsertExamResult,
);

// Upsert batch
routes.post(
  "/upsert-batch",
  validate(upsertBatchSchema),
  examResultController.upsertBatchExamResults,
);

// Get grade stats
routes.get(
  "/grade/:gradeId/stats",
  examResultController.getGradeExamResultsStats,
);

// Get group stats
routes.get(
  "/group/:groupId/stats",
  examResultController.getGroupExamResultsStats,
);

// Get exam results
routes.get("/exam/:examId", examResultController.getExamResults);

// Get exam stats
routes.get("/exam/:examId/stats", examResultController.getExamResultStats);

// Update exam result
routes.put(
  "/:id",
  validate(updateExamResultSchema),
  examResultController.updateExamResult,
);

// Delete exam result
routes.delete("/:id", examResultController.deleteExamResult);

module.exports = routes;
