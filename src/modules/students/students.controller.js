const studentService = require("./students.service");

//PART 1: CRUD & SEARCH OPERATIONS

// Create a new student
const createStudent = async (req, res, next) => {
  try {
    const student = await studentService.createStudent(req.body);
    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Get all students with filters
const getAllStudents = async (req, res, next) => {
  try {
    const { search = "", grade_id = null, group_id = null } = req.query;
    const page = parseInt(req.query.page) || 1;

    const students = await studentService.getAllStudents({
      search,
      grade_id: grade_id ? parseInt(grade_id) : null,
      group_id: group_id ? parseInt(group_id) : null,
      page,
    });

    const { count } = await studentService.getStudentsCount({
      search,
      grade_id: grade_id ? parseInt(grade_id) : null,
      group_id: group_id ? parseInt(group_id) : null,
    });

    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: students,
      pagination: {
        page,
        limit: 20,
        total: parseInt(count),
        totalPages: Math.ceil(parseInt(count) / 20),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get a single student by ID
const getStudentById = async (req, res, next) => {
  try {
    const student = await studentService.getStudentById(
      req.params.studentId || req.clientId,
    );
    if (!student) throw new Error("Student not found");
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Get a student by barcode
const getStudentByBarcode = async (req, res, next) => {
  try {
    const student = await studentService.getStudentByBarcode(req.query.barcode);
    if (!student) throw new Error("Student not found");
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Find a student by phone number
const findStudentByPhone = async (req, res, next) => {
  try {
    const student = await studentService.findStudentByPhone(req.query.phone);
    if (!student) throw new Error("Student not found");
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Find students by parent phone number
const findStudentByParentPhone = async (req, res, next) => {
  try {
    const students = await studentService.findStudentByParentPhone(
      req.query.parent_phone,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

// Get all students in a specific grade
const getStudentsByGradeId = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const students = await studentService.getStudentsByGradeId(
      req.params.gradeId,
      page,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

// Get all students in a specific group
const getStudentsByGroupId = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const students = await studentService.getStudentsByGroupId(
      req.params.groupId,
      page,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

// Get all deleted students
const getDeletedStudents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const students = await studentService.getDeletedStudents(page);
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

// Update a student's full information
const updateStudent = async (req, res, next) => {
  try {
    const student = await studentService.updateStudent(
      req.params.studentId,
      req.body,
    );
    if (!student) throw new Error("Student not found");
    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Update student's profile image
const updateStudentProfileImage = async (req, res, next) => {
  try {
    const student = await studentService.updateStudentProfileImage(
      req.clientId,
      req.body.profile_image,
    );
    return res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Delete student's profile image
const deleteStudentProfileImage = async (req, res, next) => {
  try {
    const student = await studentService.deleteStudentProfileImage(
      req.clientId,
    );
    return res.status(200).json({
      success: true,
      message: "Profile image deleted successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Get student's profile image
const getStudentProfileImage = async (req, res, next) => {
  try {
    const image = await studentService.getStudentProfileImage(
      req.params.studentId || req.clientId,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: image,
    });
  } catch (error) {
    next(error);
  }
};

// Update student's password
const updateStudentPassword = async (req, res, next) => {
  try {
    const student = await studentService.updateStudentPassword(
      req.clientId,
      req.body.newPassword,
    );
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Soft delete a student
const softDeleteStudent = async (req, res, next) => {
  try {
    const student = await studentService.softDeleteStudent(
      req.params.studentId,
    );
    if (!student) throw new Error("Student not found");
    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Hard delete a student
const hardDeleteStudent = async (req, res, next) => {
  try {
    const student = await studentService.hardDeleteStudent(
      req.params.studentId,
    );
    if (!student) throw new Error("Student not found");
    return res.status(200).json({
      success: true,
      message: "Student permanently deleted",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Restore a soft-deleted student
const restoreStudent = async (req, res, next) => {
  try {
    const student = await studentService.restoreStudent(req.params.studentId);
    if (!student) throw new Error("Student not found");
    return res.status(200).json({
      success: true,
      message: "Student restored successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// PART 2: PROFILE & STATISTICS

// Get student full profile
const getStudentProfile = async (req, res, next) => {
  try {
    const student = await studentService.getStudentProfile(
      req.params.studentId || req.clientId,
    );
    if (!student) throw new Error("Student not found");
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// Get student quick stats
const getStudentQuickStats = async (req, res, next) => {
  try {
    const stats = await studentService.getStudentQuickStats(
      req.params.studentId || req.clientId,
    );
    if (!stats) throw new Error("Student not found");
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

// Get attendance history with month filter
const getAttendanceHistory = async (req, res, next) => {
  try {
    const { month = "" } = req.query;
    const page = parseInt(req.query.page) || 1;
    const attendance = await studentService.getAttendanceHistory(
      req.params.studentId || req.clientId,
      month,
      page,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

// Get monthly attendance stats
const getMonthlyAttendanceStats = async (req, res, next) => {
  try {
    const stats = await studentService.getMonthlyAttendanceStats(
      req.params.studentId || req.clientId,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

// Get total attendance for a specific month
const getStudentTotalAttendance = async (req, res, next) => {
  try {
    const { month } = req.query;
    if (!month) throw new Error("Month is required");
    const stats = await studentService.getStudentTotalAttendance(
      req.params.studentId || req.clientId,
      month,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

// Get consecutive absences
const getConsecutiveAbsences = async (req, res, next) => {
  try {
    const absences = await studentService.getConsecutiveAbsences(
      req.params.studentId || req.clientId,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: absences,
    });
  } catch (error) {
    next(error);
  }
};

// Get payment history with month filter
const getPaymentHistory = async (req, res, next) => {
  try {
    const { month = "" } = req.query;
    const page = parseInt(req.query.page) || 1;
    const payments = await studentService.getPaymentHistory(
      req.params.studentId || req.clientId,
      month,
      page,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

// Get remaining balance
const getRemainingBalance = async (req, res, next) => {
  try {
    const balance = await studentService.getRemainingBalance(
      req.params.studentId || req.clientId,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: balance,
    });
  } catch (error) {
    next(error);
  }
};

// Get current month subscription
const getCurrentSubscription = async (req, res, next) => {
  try {
    const subscription = await studentService.getCurrentSubscription(
      req.params.studentId || req.clientId,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

//PART 3: EXAMS, ASSIGNMENTS & CONTENT
// Get all paper exams with student status
const getStudentPaperExams = async (req, res, next) => {
  try {
    const { month = "" } = req.query;
    const page = parseInt(req.query.page) || 1;
    const exams = await studentService.getStudentPaperExams(
      req.params.studentId || req.clientId,
      month,
      page,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: exams,
    });
  } catch (error) {
    next(error);
  }
};

// Get student exam results
const getStudentExamResults = async (req, res, next) => {
  try {
    const { month = "" } = req.query;
    const page = parseInt(req.query.page) || 1;
    const results = await studentService.getStudentExamResults(
      req.params.studentId || req.clientId,
      month,
      page,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

// Get available online exams
const getAvailableOnlineExams = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const exams = await studentService.getAvailableOnlineExams(
      req.clientId,
      page,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: exams,
    });
  } catch (error) {
    next(error);
  }
};

// Get student's submitted online exams
const getStudentOnlineExams = async (req, res, next) => {
  try {
    const { month = "" } = req.query;
    const page = parseInt(req.query.page) || 1;
    const exams = await studentService.getStudentOnlineExams(
      req.params.studentId || req.clientId,
      month,
      page,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: exams,
    });
  } catch (error) {
    next(error);
  }
};

// Get student answers for a specific exam
const getStudentExamAnswers = async (req, res, next) => {
  try {
    const answers = await studentService.getStudentExamAnswers(
      req.params.examId,
      req.params.studentId || req.clientId,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: answers,
    });
  } catch (error) {
    next(error);
  }
};

// Get student assignments
const getStudentAssignments = async (req, res, next) => {
  try {
    const { month = "" } = req.query;
    const page = parseInt(req.query.page) || 1;
    const assignments = await studentService.getStudentAssignments(
      req.params.studentId || req.clientId,
      month,
      page,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: assignments,
    });
  } catch (error) {
    next(error);
  }
};

// Get student submissions
const getStudentSubmissions = async (req, res, next) => {
  try {
    const { month = "" } = req.query;
    const page = parseInt(req.query.page) || 1;
    const submissions = await studentService.getStudentSubmissions(
      req.params.studentId || req.clientId,
      month,
      page,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: submissions,
    });
  } catch (error) {
    next(error);
  }
};

// Get student playlists
const getStudentPlaylists = async (req, res, next) => {
  try {
    const playlists = await studentService.getStudentPlaylists(
      req.params.studentId || req.clientId,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: playlists,
    });
  } catch (error) {
    next(error);
  }
};

// Get videos in a playlist
const getPlaylistVideos = async (req, res, next) => {
  try {
    const videos = await studentService.getPlaylistVideos(
      req.params.playlistId,
    );
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: videos,
    });
  } catch (error) {
    next(error);
  }
};

// Get specific paper exam details
const getStudentPaperExamById = async (req, res, next) => {
  try {
    const exam = await studentService.getStudentPaperExamById(
      req.params.studentId || req.clientId,
      req.params.examId,
    );
    if (!exam) throw new Error("Exam not found");
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: exam,
    });
  } catch (error) {
    next(error);
  }
};

// Get specific online exam details
const getStudentOnlineExamById = async (req, res, next) => {
  try {
    const exam = await studentService.getStudentOnlineExamById(
      req.params.studentId || req.clientId,
      req.params.attemptId,
    );
    if (!exam) throw new Error("Exam attempt not found");
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: exam,
    });
  } catch (error) {
    next(error);
  }
};

// Get specific assignment details
const getStudentAssignmentById = async (req, res, next) => {
  try {
    const assignment = await studentService.getStudentAssignmentById(
      req.params.studentId || req.clientId,
      req.params.assignmentId,
    );
    if (!assignment) throw new Error("Assignment not found");
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: assignment,
    });
  } catch (error) {
    next(error);
  }
};

// Get specific submission details
const getStudentSubmissionById = async (req, res, next) => {
  try {
    const submission = await studentService.getStudentSubmissionById(
      req.params.submissionId,
      req.params.studentId || req.clientId,
    );
    if (!submission) throw new Error("Submission not found");
    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      data: submission,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // Part 1: CRUD & Search
  createStudent,
  getAllStudents,
  getStudentById,
  getStudentByBarcode,
  findStudentByPhone,
  findStudentByParentPhone,
  getStudentsByGradeId,
  getStudentsByGroupId,
  getDeletedStudents,
  updateStudent,
  updateStudentProfileImage,
  deleteStudentProfileImage,
  getStudentProfileImage,
  updateStudentPassword,
  softDeleteStudent,
  hardDeleteStudent,
  restoreStudent,
  // Part 2: Profile & Statistics
  getStudentProfile,
  getStudentQuickStats,
  getAttendanceHistory,
  getMonthlyAttendanceStats,
  getStudentTotalAttendance,
  getConsecutiveAbsences,
  getPaymentHistory,
  getRemainingBalance,
  getCurrentSubscription,
  // Part 3: Exams, Assignments & Content
  getStudentPaperExams,
  getStudentExamResults,
  getAvailableOnlineExams,
  getStudentOnlineExams,
  getStudentExamAnswers,
  getStudentAssignments,
  getStudentSubmissions,
  getStudentPlaylists,
  getPlaylistVideos,
  getStudentPaperExamById,
  getStudentOnlineExamById,
  getStudentAssignmentById,
  getStudentSubmissionById,
};
