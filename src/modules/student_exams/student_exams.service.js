const { query } = require("../../config/database");
const studentExamQueries = require("./student_exams.queries");

const getStudentExamsByExamId = async (examId) => {
  const result = await query(studentExamQueries.getStudentExamsByExamId, [examId]);
  return result.rows;
};

const getExamAttemptStats = async (examId) => {
  const result = await query(studentExamQueries.getExamAttemptStats, [examId]);
  return result.rows[0];
};

const getGradeExamAttemptsStats = async (gradeId) => {
  const result = await query(studentExamQueries.getGradeExamAttemptsStats, [gradeId]);
  return result.rows;
};

const getGroupExamAttemptsStats = async (groupId) => {
  const result = await query(studentExamQueries.getGroupExamAttemptsStats, [groupId]);
  return result.rows;
};

module.exports = {
  getStudentExamsByExamId,
  getExamAttemptStats,
  getGradeExamAttemptsStats,
  getGroupExamAttemptsStats
};