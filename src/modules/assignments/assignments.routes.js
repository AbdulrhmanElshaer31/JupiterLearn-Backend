const express = require("express");

const routes = express.Router();

const assignmentController = require("./assignments.controller");

const validate = require("../../middlewares/validate.middleware");

const assignmentUpload = require("../../middlewares/uploads/assignmentUpload");

const {
  createAssignmentSchema,
  updateAssignmentSchema,
} = require("../../middlewares/validations/assignment.validation");

// Get all assignments
routes.get("/", assignmentController.getAllAssignments);

// Get assignments by grade
routes.get("/grade/:gradeId", assignmentController.getAssignmentsByGradeId);

// Get assignments by group
routes.get("/group/:groupId", assignmentController.getAssignmentsByGroupId);

// Get assignment by ID
// routes.get("/:assignmentId", assignmentController.getAssignmentById);
routes.get("/:assignmentId", assignmentController.downloadAssignment);




// Create assignment + upload file
routes.post(
  "/",
  assignmentUpload.single("file"),
  validate(createAssignmentSchema),
  assignmentController.createAssignment,
);


// Update assignment
routes.put(
  "/:assignmentId",
  validate(updateAssignmentSchema),
  assignmentController.updateAssignment,
);

// Delete assignment
routes.delete("/:assignmentId", assignmentController.deleteAssignment);

module.exports = routes;
