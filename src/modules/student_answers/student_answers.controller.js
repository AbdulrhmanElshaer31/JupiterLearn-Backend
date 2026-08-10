const studentAnswerService = require("./student_answers.service");

const getQuestionAnswerStats = async (req, res, next) => {
  try {
    const stats = await studentAnswerService.getQuestionAnswerStats(
      req.params.questionId,
    );
    if (!stats) throw new Error("Question Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

const getMostSelectedOptions = async (req, res, next) => {
  try {
    const options = await studentAnswerService.getMostSelectedOptions(
      req.params.questionId,
    );
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: options,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getQuestionAnswerStats,
  getMostSelectedOptions,
};
