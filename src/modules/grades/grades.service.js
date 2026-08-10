const { query } = require("../../config/database");
const gradeQueries = require("./grades.queries");

const getAllGrades = async () => {
  const result = await query(gradeQueries.getAllGrades);
  return result.rows;
};

const getGradeById = async (gradeId) => {
  const result = await query(gradeQueries.getGradeById, [gradeId]);
  return result.rows[0];
};

const getActiveGrades = async () => {
  const result = await query(gradeQueries.getActiveGrades);
  return result.rows;
};

const getInactiveGrades = async () => {
  const result = await query(gradeQueries.getInactiveGrades);
  return result.rows;
};

const getGradeStats = async (gradeId) => {
  const result = await query(gradeQueries.getGradeStats, [gradeId]);
  return result.rows[0];
};

const getAllGradesStats = async () => {
  const result = await query(gradeQueries.getAllGradesStats);
  return result.rows;
};

module.exports = {
  getAllGrades,
  getGradeById,
  getActiveGrades,
  getInactiveGrades,
  getGradeStats,
  getAllGradesStats
};