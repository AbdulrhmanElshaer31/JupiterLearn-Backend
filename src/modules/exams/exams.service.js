// exams.service.js

const { query } = require("../../config/database");
const examQueries = require("./exams.queries");

const getAllExams = async () => {
  const result = await query(examQueries.getAllExams);
  return result.rows;
};

const getExamById = async (examId) => {
  const result = await query(examQueries.getExamById, [examId]);
  return result.rows[0];
};

const getExamsByGradeId = async (gradeId) => {
  const result = await query(examQueries.getExamsByGradeId, [gradeId]);
  return result.rows;
};

const getExamsByGroupId = async (groupId) => {
  const result = await query(examQueries.getExamsByGroupId, [groupId]);
  return result.rows;
};

const getExamStats = async (examId) => {
  const result = await query(examQueries.getExamStats, [examId]);
  return result.rows[0];
};

const getGradeExamStats = async (gradeId) => {
  const result = await query(examQueries.getGradeExamStats, [gradeId]);
  return result.rows[0];
};

module.exports = {
  getAllExams,
  getExamById,
  getExamsByGradeId,
  getExamsByGroupId,
  getExamStats,
  getGradeExamStats
};