const { query } = require("../../config/database");
const studentAnswerQueries = require("./student_answers.queries");

const getQuestionAnswerStats = async (questionId) => {
  const result = await query(studentAnswerQueries.getQuestionAnswerStats, [
    questionId,
  ]);
  return result.rows[0];
};

const getMostSelectedOptions = async (questionId) => {
  const result = await query(studentAnswerQueries.getMostSelectedOptions, [
    questionId,
  ]);
  return result.rows;
};

module.exports = {
  getQuestionAnswerStats,
  getMostSelectedOptions,
};
