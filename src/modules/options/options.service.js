const { query } = require("../../config/database");
const optionQueries = require("./options.queries");

const getOptionsByQuestionId = async (questionId) => {
  const result = await query(optionQueries.getOptionsByQuestionId, [questionId]);
  return result.rows;
};

const getOptionById = async (optionId) => {
  const result = await query(optionQueries.getOptionById, [optionId]);
  return result.rows[0];
};

const createOption = async (questionId, optionText, isCorrect, order) => {
  const result = await query(optionQueries.createOption, [questionId, optionText, isCorrect, order]);
  return result.rows[0];
};


const updateOption = async (optionId, optionText, isCorrect, order) => {
  const existing = await query("SELECT * FROM options WHERE id = $1", [optionId]);
  if (!existing.rows[0]) return null;
  
  const updated = {
    option_text: optionText ?? existing.rows[0].option_text,
    is_correct: isCorrect ?? existing.rows[0].is_correct,
    order: order ?? existing.rows[0].order
  };
  
  const result = await query(optionQueries.updateOption, [optionId, updated.option_text, updated.is_correct, updated.order]);
  return result.rows[0];
};

const deleteOption = async (optionId) => {
  const result = await query(optionQueries.deleteOption, [optionId]);
  return result.rows[0];
};

module.exports = {
  getOptionsByQuestionId,
  getOptionById,
  createOption,
  updateOption,
  deleteOption
};