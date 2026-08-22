const questionService = require("./questions.service");
const getQuestionsByExamId = async (req, res, next) => {
  try {
    const questions = await questionService.getQuestionsByExamId(
      req.params.examId,
    );
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: questions,
    });
  } catch (error) {
    next(error);
  }
};
const getQuestionById = async (req, res, next) => {
  try {
    const question = await questionService.getQuestionById(
      req.params.questionId,
    );
    if (!question) throw new Error("Question Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: question,
    });
  } catch (error) {
    next(error);
  }
};
const createQuestion = async (req, res, next) => {
  try {
    const { exam_id, question_text, type, order } = req.body;
    const question = await questionService.createQuestion(
      exam_id,
      question_text,
      type,
      order,
    );
    return res.status(201).json({
      success: true,
      message: "Question Created!",
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

const updateQuestion = async (req, res, next) => {
  try {
    const { question_text, type, order } = req.body;
    const question = await questionService.updateQuestion(
      req.params.questionId,
      question_text,
      type,
      order,
    );
    if (!question) throw new Error("Question Not Found!");
    return res.status(200).json({
      success: true,
      message: "Question Updated!",
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    const question = await questionService.deleteQuestion(
      req.params.questionId,
    );
    if (!question) throw new Error("Question Not Found!");
    return res.status(200).json({
      success: true,
      message: "Question Deleted!",
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getQuestionsByExamId,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
