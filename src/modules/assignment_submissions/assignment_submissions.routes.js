const express = require("express");
const routes = express.Router();
const assignmentSubmissionController = require("./assignment_submissions.controller");
const validate = require("../../middlewares/validate.middleware");
const { gradeSubmissionSchema } = require("../../middlewares/validations/assignmentSubmission.validation");

routes.get("/assignment/:assignmentId", assignmentSubmissionController.getSubmissionsByAssignmentId);
routes.get("/assignment/:assignmentId/student/:studentId", assignmentSubmissionController.getStudentSubmission);
routes.put("/:submissionId/grade", validate(gradeSubmissionSchema), assignmentSubmissionController.gradeSubmission);
routes.get("/stats/assignment/:assignmentId", assignmentSubmissionController.getAssignmentSubmissionStats);
routes.get("/stats/grade/:gradeId", assignmentSubmissionController.getGradeAssignmentSubmissionStats);
routes.get("/stats/group/:groupId", assignmentSubmissionController.getGroupAssignmentSubmissionStats);

module.exports = routes;