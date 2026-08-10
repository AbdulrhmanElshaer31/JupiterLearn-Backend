const { query } = require("../../config/database");
const assignmentSubmissionQueries = require("./assignment_submissions.queries");

const getSubmissionsByAssignmentId = async (assignmentId) => {
  const result = await query(assignmentSubmissionQueries.getSubmissionsByAssignmentId, [assignmentId]);
  return result.rows;
};

const getStudentSubmission = async (assignmentId, studentId) => {
  const result = await query(assignmentSubmissionQueries.getStudentSubmission, [assignmentId, studentId]);
  return result.rows[0];
};

const gradeSubmission = async (submissionId, score, feedback, reviewedBy) => {
  const result = await query(assignmentSubmissionQueries.gradeSubmission, [submissionId, score, feedback, reviewedBy]);
  return result.rows[0];
};

const getAssignmentSubmissionStats = async (assignmentId) => {
  const result = await query(assignmentSubmissionQueries.getAssignmentSubmissionStats, [assignmentId]);
  return result.rows[0];
};

const getGradeAssignmentSubmissionStats = async (gradeId) => {
  const result = await query(assignmentSubmissionQueries.getGradeAssignmentSubmissionStats, [gradeId]);
  return result.rows;
};

const getGroupAssignmentSubmissionStats = async (groupId) => {
  const result = await query(assignmentSubmissionQueries.getGroupAssignmentSubmissionStats, [groupId]);
  return result.rows;
};

module.exports = {
  getSubmissionsByAssignmentId,
  getStudentSubmission,
  gradeSubmission,
  getAssignmentSubmissionStats,
  getGradeAssignmentSubmissionStats,
  getGroupAssignmentSubmissionStats
};