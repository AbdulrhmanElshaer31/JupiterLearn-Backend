const { query } = require("../../config/database");
const questionQueries = require("./questions.queries");
const getQuestionsByExamId = async (examId) => {
  const result = await query(questionQueries.getQuestionsByExamId, [examId]);
  return result.rows;
};
const getQuestionById = async (questionId) => {
  const result = await query(questionQueries.getQuestionById, [questionId]);
  return result.rows[0];
};
const createQuestion = async (examId, questionText, type, order) => {
  const result = await query(questionQueries.createQuestion, [
    examId,
    questionText,
    type,
    order,
  ]);
  return result.rows[0];
};

const updateQuestion = async (questionId, questionText, type, order) => {
  const existing = await query("SELECT * FROM questions WHERE id = $1", [
    questionId,
  ]);
  if (!existing.rows[0]) return null;

  const updated = {
    question_text: questionText ?? existing.rows[0].question_text,
    type: type ?? existing.rows[0].type,
    order: order ?? existing.rows[0].order,
  };

  const result = await query(questionQueries.updateQuestion, [
    questionId,
    updated.question_text,
    updated.type,
    updated.order,
  ]);
  return result.rows[0];
};
const deleteQuestion = async (questionId) => {
  const result = await query(questionQueries.deleteQuestion, [questionId]);
  return result.rows[0];
};
module.exports = {
  getQuestionsByExamId,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
