const studentService = require("./students.service");

const getStudentProfile = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.clientId;
    const std = await studentService.getStudentProfile(studentId);
    if (!std) throw new Error("Student Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: std,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentQuickStats = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.clientId;
    const stats = await studentService.getStudentQuickStats(studentId);
    if (!stats) throw new Error("Student Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

const getAttendanceHistory = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.clientId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const attendance = await studentService.getAttendanceHistory(
      studentId,
      page,
      limit,
    );
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

const getMonthlyAttendanceStats = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.clientId;
    const stats = await studentService.getMonthlyAttendanceStats(studentId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

const getConsecutiveAbsences = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.clientId;
    const absences = await studentService.getConsecutiveAbsences(studentId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: absences,
    });
  } catch (error) {
    next(error);
  }
};

const getPaymentHistory = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.clientId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const payments = await studentService.getPaymentHistory(
      studentId,
      page,
      limit,
    );
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

const getRemainingBalance = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.clientId;
    const balance = await studentService.getRemainingBalance(studentId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: balance,
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentSubscription = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.clientId;
    const subscription = await studentService.getCurrentSubscription(studentId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentPaperExams = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.clientId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const exams = await studentService.getStudentPaperExams(
      studentId,
      page,
      limit,
    );
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: exams,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentExamResults = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.clientId;
    const results = await studentService.getStudentExamResults(studentId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

const getAvailableOnlineExams = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.clientId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const exams = await studentService.getAvailableOnlineExams(
      studentId,
      page,
      limit,
    );
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: exams,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentOnlineExams = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.clientId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const exams = await studentService.getStudentOnlineExams(
      studentId,
      page,
      limit,
    );
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: exams,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentExamAnswers = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.clientId;
    const examId = req.params.examId;
    const answers = await studentService.getStudentExamAnswers(
      examId,
      studentId,
    );
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: answers,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentAssignments = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.clientId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const assignments = await studentService.getStudentAssignments(
      studentId,
      page,
      limit,
    );
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: assignments,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentSubmissions = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.clientId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const submissions = await studentService.getStudentSubmissions(
      studentId,
      page,
      limit,
    );
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: submissions,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentPlaylists = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.clientId;
    const playlists = await studentService.getStudentPlaylists(studentId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: playlists,
    });
  } catch (error) {
    next(error);
  }
};

const getPlaylistVideos = async (req, res, next) => {
  try {
    const playlistId = req.params.playlistId;
    const videos = await studentService.getPlaylistVideos(playlistId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: videos,
    });
  } catch (error) {
    next(error);
  }
};

const getAllStudents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || "";
    const gradeId = req.query.gradeId || null;
    const groupId = req.query.groupId || null;

    const students = await studentService.getAllStudents(
      page,
      limit,
      search,
      gradeId,
      groupId,
    );
    const total = await studentService.getStudentsCount(
      search,
      gradeId,
      groupId,
    );

    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: students,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getStudentFullRecords = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    const records = await studentService.getStudentFullRecords(studentId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentFilters = async (req, res, next) => {
  try {
    const grades = await studentService.getAllGrades();
    const groups = await studentService.getAllGroups();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: { grades, groups },
    });
  } catch (error) {
    next(error);
  }
};

const searchStudentByBarcode = async (req, res, next) => {
  try {
    const student = await studentService.getStudentByBarcode(req.query.barcode);
    if (!student) throw new Error("Student Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const student = await studentService.getStudentById(req.params.studentId);
    if (!student) throw new Error("Student Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

const startOnlineExam = async (req, res, next) => {
  try {
    const examId = req.params.examId;
    const data = await studentService.startOnlineExam(examId, req.clientId);
    return res.status(200).json({
      success: true,
      message: "Exam Started!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const answerQuestion = async (req, res, next) => {
  try {
    const examId = req.params.examId;
    const { questionId, selectedOptionId } = req.body;
    const data = await studentService.answerQuestion(
      examId,
      req.clientId,
      questionId,
      selectedOptionId,
    );
    return res.status(200).json({
      success: true,
      message: "Answer Saved!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const submitOnlineExam = async (req, res, next) => {
  try {
    const attemptId = req.params.examId;
    const { answers } = req.body;
    const data = await studentService.submitOnlineExam(
      attemptId,
      req.clientId,
      answers,
    );
    return res.status(200).json({
      success: true,
      message: "Exam Submitted!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const submitAssignment = async (req, res, next) => {
  try {
    const assignmentId = req.params.assignmentId;
    const filePath = req.file ? req.file.path : req.body.filePath;
    const data = await studentService.submitAssignment(
      assignmentId,
      req.clientId,
      filePath,
    );
    return res.status(200).json({
      success: true,
      message: "Assignment Submitted!",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudentProfile,
  getStudentFilters,
  getStudentQuickStats,
  getAttendanceHistory,
  getMonthlyAttendanceStats,
  getConsecutiveAbsences,
  getPaymentHistory,
  getRemainingBalance,
  getCurrentSubscription,
  getStudentPaperExams,
  getStudentExamResults,
  getAvailableOnlineExams,
  getStudentOnlineExams,
  getStudentExamAnswers,
  getStudentAssignments,
  getStudentSubmissions,
  getStudentPlaylists,
  getPlaylistVideos,
  getAllStudents,
  searchStudentByBarcode,
  getStudentById,
  startOnlineExam,
  answerQuestion,
  submitOnlineExam,
  submitAssignment,
  getStudentFullRecords,
};
