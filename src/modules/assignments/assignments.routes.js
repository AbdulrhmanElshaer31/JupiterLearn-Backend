const express = require("express");
const routes = express.Router();
const assignmentController = require("./assignments.controller");
const validate = require("../../middlewares/validate.middleware");
const { createAssignmentSchema, updateAssignmentSchema } = require("../../middlewares/validations/assignment.validation");

routes.get("/", assignmentController.getAllAssignments);
routes.get("/:assignmentId", assignmentController.getAssignmentById);
routes.get("/grade/:gradeId", assignmentController.getAssignmentsByGradeId);
routes.get("/group/:groupId", assignmentController.getAssignmentsByGroupId);
routes.post("/", validate(createAssignmentSchema), assignmentController.createAssignment);
routes.put("/:assignmentId", validate(updateAssignmentSchema), assignmentController.updateAssignment);
routes.delete("/:assignmentId", assignmentController.deleteAssignment);

module.exports = routes;