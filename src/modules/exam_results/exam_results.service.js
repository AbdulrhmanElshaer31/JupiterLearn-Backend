const { query } = require("../../config/database");
const examResultQueries = require("./exam_results.queries");

// Create exam result
const createExamResult = async (examResultData) => {
  const { exam_id, student_id, degree, notes } = examResultData;
  const result = await query(examResultQueries.createExamResult, [
    exam_id,
    student_id,
    degree,
    notes,
  ]);
  return result.rows[0];
};

// Upsert exam result
const upsertExamResult = async (examResultData) => {
  const { exam_id, student_id, degree, notes } = examResultData;
  const result = await query(examResultQueries.upsertExamResult, [
    exam_id,
    student_id,
    degree,
    notes,
  ]);
  return result.rows[0];
};

// Upsert batch exam results
const upsertBatchExamResults = async (records) => {
  const results = [];
  for (const record of records) {
    const result = await upsertExamResult(record);
    results.push(result);
  }
  return results;
};

// Update exam result
const updateExamResult = async (id, examResultData) => {
  const { degree, notes } = examResultData;
  const result = await query(examResultQueries.updateExamResult, [
    degree,
    notes,
    id,
  ]);
  return result.rows[0];
};

// Delete exam result
const deleteExamResult = async (id) => {
  const result = await query(examResultQueries.deleteExamResult, [id]);
  return result.rows[0];
};

// Get exam results
const getExamResults = async (examId) => {
  const result = await query(examResultQueries.getExamResults, [examId]);
  return result.rows;
};

// Get exam result stats
const getExamResultStats = async (examId) => {
  const result = await query(examResultQueries.getExamResultStats, [examId]);
  return result.rows[0];
};

// Get grade exam results stats
const getGradeExamResultsStats = async (gradeId) => {
  const result = await query(examResultQueries.getGradeExamResultsStats, [
    gradeId,
  ]);
  return result.rows;
};

// Get group exam results stats
const getGroupExamResultsStats = async (groupId) => {
  const result = await query(examResultQueries.getGroupExamResultsStats, [
    groupId,
  ]);
  return result.rows;
};

module.exports = {
  createExamResult,
  upsertExamResult,
  upsertBatchExamResults,
  updateExamResult,
  deleteExamResult,
  getExamResults,
  getExamResultStats,
  getGradeExamResultsStats,
  getGroupExamResultsStats,
};
