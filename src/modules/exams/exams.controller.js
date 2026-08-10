// exams.controller.js

const examService = require("./exams.service");

const getAllExams = async (req, res, next) => {
  try {
    const exams = await examService.getAllExams();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: exams,
    });
  } catch (error) {
    next(error);
  }
};

const getExamById = async (req, res, next) => {
  try {
    const exam = await examService.getExamById(req.params.examId);
    if (!exam) throw new Error("Exam Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: exam,
    });
  } catch (error) {
    next(error);
  }
};

const getExamsByGradeId = async (req, res, next) => {
  try {
    const exams = await examService.getExamsByGradeId(req.params.gradeId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: exams,
    });
  } catch (error) {
    next(error);
  }
};

const getExamsByGroupId = async (req, res, next) => {
  try {
    const exams = await examService.getExamsByGroupId(req.params.groupId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: exams,
    });
  } catch (error) {
    next(error);
  }
};

const getExamStats = async (req, res, next) => {
  try {
    const stats = await examService.getExamStats(req.params.examId);
    if (!stats) throw new Error("Exam Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

const getGradeExamStats = async (req, res, next) => {
  try {
    const stats = await examService.getGradeExamStats(req.params.gradeId);
    if (!stats) throw new Error("Grade Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllExams,
  getExamById,
  getExamsByGradeId,
  getExamsByGroupId,
  getExamStats,
  getGradeExamStats,
};
