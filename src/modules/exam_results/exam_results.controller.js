const examResultService = require("./exam_results.service");

const getExamResults = async (req, res, next) => {
  try {
    const results = await examResultService.getExamResults(req.params.examId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

const getExamResultStats = async (req, res, next) => {
  try {
    const stats = await examResultService.getExamResultStats(req.params.examId);
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

const getGradeExamResultsStats = async (req, res, next) => {
  try {
    const stats = await examResultService.getGradeExamResultsStats(req.params.gradeId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

const getGroupExamResultsStats = async (req, res, next) => {
  try {
    const stats = await examResultService.getGroupExamResultsStats(req.params.groupId);
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
  getExamResults,
  getExamResultStats,
  getGradeExamResultsStats,
  getGroupExamResultsStats
};