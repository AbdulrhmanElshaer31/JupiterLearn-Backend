const { query } = require("../../config/database");
const examResultQueries = require("./exam_results.queries");

const getExamResults = async (examId) => {
  const result = await query(examResultQueries.getExamResults, [examId]);
  return result.rows;
};

const getExamResultStats = async (examId) => {
  const result = await query(examResultQueries.getExamResultStats, [examId]);
  return result.rows[0];
};

const getGradeExamResultsStats = async (gradeId) => {
  const result = await query(examResultQueries.getGradeExamResultsStats, [gradeId]);
  return result.rows;
};

const getGroupExamResultsStats = async (groupId) => {
  const result = await query(examResultQueries.getGroupExamResultsStats, [groupId]);
  return result.rows;
};

module.exports = {
  getExamResults,
  getExamResultStats,
  getGradeExamResultsStats,
  getGroupExamResultsStats
};