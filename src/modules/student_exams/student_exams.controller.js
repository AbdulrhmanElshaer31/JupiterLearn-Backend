const studentExamService = require("./student_exams.service");

const getStudentExamsByExamId = async (req, res, next) => {
  try {
    const attempts = await studentExamService.getStudentExamsByExamId(
      req.params.examId,
    );
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: attempts,
    });
  } catch (error) {
    next(error);
  }
};

const getExamAttemptStats = async (req, res, next) => {
  try {
    const stats = await studentExamService.getExamAttemptStats(
      req.params.examId,
    );
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

const getGradeExamAttemptsStats = async (req, res, next) => {
  try {
    const stats = await studentExamService.getGradeExamAttemptsStats(
      req.params.gradeId,
    );
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

const getGroupExamAttemptsStats = async (req, res, next) => {
  try {
    const stats = await studentExamService.getGroupExamAttemptsStats(
      req.params.groupId,
    );
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
  getStudentExamsByExamId,
  getExamAttemptStats,
  getGradeExamAttemptsStats,
  getGroupExamAttemptsStats,
};
