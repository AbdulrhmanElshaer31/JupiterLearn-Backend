const { query } = require("../../config/database");
const stdQueries = require("./students.queries");

const getStudentProfile = async (student_id) => {
  const result = await query(stdQueries.getStudentProfile, [student_id]);
  return result.rows[0];
};

const getStudentQuickStats = async (student_id) => {
  const result = await query(stdQueries.getStudentQuickStats, [student_id]);
  return result.rows[0];
};

const getAttendanceHistory = async (student_id, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const result = await query(stdQueries.getAttendanceHistory, [
    student_id,
    limit,
    offset,
  ]);
  return result.rows;
};

const getMonthlyAttendanceStats = async (student_id) => {
  const result = await query(stdQueries.getMonthlyAttendanceStats, [
    student_id,
  ]);
  return result.rows;
};

const getConsecutiveAbsences = async (student_id) => {
  const result = await query(stdQueries.getConsecutiveAbsences, [student_id]);
  return result.rows[0];
};

const getPaymentHistory = async (student_id, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const result = await query(stdQueries.getPaymentHistory, [
    student_id,
    limit,
    offset,
  ]);
  return result.rows;
};

const getRemainingBalance = async (student_id) => {
  const result = await query(stdQueries.getRemainingBalance, [student_id]);
  return result.rows[0];
};

const getCurrentSubscription = async (student_id) => {
  const result = await query(stdQueries.getCurrentSubscription, [student_id]);
  return result.rows[0];
};

const getStudentPaperExams = async (student_id, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const result = await query(stdQueries.getStudentPaperExams, [
    student_id,
    limit,
    offset,
  ]);
  return result.rows;
};

const getStudentExamResults = async (student_id) => {
  const result = await query(stdQueries.getStudentExamResults, [student_id]);
  return result.rows;
};

const getAvailableOnlineExams = async (student_id, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const result = await query(stdQueries.getAvailableOnlineExams, [
    student_id,
    limit,
    offset,
  ]);
  return result.rows;
};

const getStudentOnlineExams = async (student_id, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const result = await query(stdQueries.getStudentOnlineExams, [
    student_id,
    limit,
    offset,
  ]);
  return result.rows;
};

const getStudentExamAnswers = async (exam_id, student_id) => {
  const result = await query(stdQueries.getStudentExamAnswers, [
    exam_id,
    student_id,
  ]);
  return result.rows;
};

const getStudentAssignments = async (student_id, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const result = await query(stdQueries.getStudentAssignments, [
    student_id,
    limit,
    offset,
  ]);
  return result.rows;
};

const getStudentSubmissions = async (student_id, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const result = await query(stdQueries.getStudentSubmissions, [
    student_id,
    limit,
    offset,
  ]);
  return result.rows;
};

const getStudentPlaylists = async (student_id) => {
  const result = await query(stdQueries.getStudentPlaylists, [student_id]);
  return result.rows;
};

const getPlaylistVideos = async (playlist_id) => {
  const result = await query(stdQueries.getPlaylistVideos, [playlist_id]);
  return result.rows;
};

const getAllStudents = async () => {
  const result = await query(stdQueries.getAllStudents);
  return result.rows;
};

const getStudentByBarcode = async (barcode) => {
  const result = await query(stdQueries.getStudentByBarcode, [barcode]);
  return result.rows[0];
};

const getStudentById = async (studentId) => {
  const result = await query(stdQueries.getStudentById, [studentId]);
  return result.rows[0];
};

module.exports = {
  getStudentProfile,
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
  getStudentByBarcode,
  getStudentById,
};
