const onlineExamService = require("./online_exams.service");

const getAllOnlineExams = async (req, res, next) => {
  try {
    const exams = await onlineExamService.getAllOnlineExams();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: exams,
    });
  } catch (error) {
    next(error);
  }
};

const getOnlineExamById = async (req, res, next) => {
  try {
    const exam = await onlineExamService.getOnlineExamById(req.params.examId);
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

const getOnlineExamsByGradeId = async (req, res, next) => {
  try {
    const exams = await onlineExamService.getOnlineExamsByGradeId(req.params.gradeId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: exams,
    });
  } catch (error) {
    next(error);
  }
};

const getOnlineExamsByGroupId = async (req, res, next) => {
  try {
    const exams = await onlineExamService.getOnlineExamsByGroupId(req.params.groupId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: exams,
    });
  } catch (error) {
    next(error);
  }
};

const getOnlineExamStats = async (req, res, next) => {
  try {
    const stats = await onlineExamService.getOnlineExamStats(req.params.examId);
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

const getGradeOnlineExamStats = async (req, res, next) => {
  try {
    const stats = await onlineExamService.getGradeOnlineExamStats(req.params.gradeId);
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

const createOnlineExam = async (req, res, next) => {
  try {
    const { title, description, gradeId, groupId, durationMinutes, startAt, endAt, fullMark, randomizeQuestions } = req.body;
    const exam = await onlineExamService.createOnlineExam(title, description, gradeId, groupId, durationMinutes, startAt, endAt, fullMark, randomizeQuestions, req.userId);
    return res.status(201).json({
      success: true,
      message: "Exam Created!",
      data: exam,
    });
  } catch (error) {
    next(error);
  }
};

const updateOnlineExam = async (req, res, next) => {
  try {
    const { title, description, gradeId, groupId, durationMinutes, startAt, endAt, fullMark, randomizeQuestions } = req.body;
    const exam = await onlineExamService.updateOnlineExam(req.params.examId, title, description, gradeId, groupId, durationMinutes, startAt, endAt, fullMark, randomizeQuestions);
    if (!exam) throw new Error("Exam Not Found!");
    return res.status(200).json({
      success: true,
      message: "Exam Updated!",
      data: exam,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOnlineExam = async (req, res, next) => {
  try {
    const exam = await onlineExamService.deleteOnlineExam(req.params.examId);
    if (!exam) throw new Error("Exam Not Found!");
    return res.status(200).json({
      success: true,
      message: "Exam Deleted!",
      data: exam,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllOnlineExams,
  getOnlineExamById,
  getOnlineExamsByGradeId,
  getOnlineExamsByGroupId,
  getOnlineExamStats,
  getGradeOnlineExamStats,
  createOnlineExam,
  updateOnlineExam,
  deleteOnlineExam
};