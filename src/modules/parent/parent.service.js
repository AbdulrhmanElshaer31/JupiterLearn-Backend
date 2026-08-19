// parent.service.js

const { query } = require("../../config/database");
const parentQueries = require("./parent.queries");

const getStudentByParentToken = async (token) => {
  const result = await query(parentQueries.getStudentByParentToken, [token]);
  return result.rows[0];
};

const getParentDashboardAttendance = async (studentId) => {
  const result = await query(parentQueries.getParentDashboardAttendance, [studentId]);
  return result.rows[0];
};

const getAttendanceHistory = async (studentId) => {
  const result = await query(parentQueries.getAttendanceHistory, [studentId]);
  return result.rows;
};

const getParentDashboardPayments = async (studentId) => {
  const result = await query(parentQueries.getParentDashboardPayments, [studentId]);
  return result.rows[0];
};

const getPaymentHistory = async (studentId) => {
  const result = await query(parentQueries.getPaymentHistory, [studentId]);
  return result.rows;
};

const getPaperExams = async (studentId) => {
  const result = await query(parentQueries.getPaperExams, [studentId]);
  return result.rows;
};

const getOnlineExams = async (studentId) => {
  const result = await query(parentQueries.getOnlineExams, [studentId]);
  return result.rows;
};

const getParentDashboardAssignments = async (studentId) => {
  const result = await query(parentQueries.getParentDashboardAssignments, [studentId]);
  return result.rows;
};

const getGroupInfo = async (studentId) => {
  const result = await query(parentQueries.getGroupInfo, [studentId]);
  return result.rows[0];
};

const getStudentOverallStats = async (studentId) => {
  const result = await query(parentQueries.getStudentOverallStats, [studentId]);
  return result.rows[0];
};

module.exports = {
  getStudentByParentToken,
  getParentDashboardAttendance,
  getAttendanceHistory,
  getParentDashboardPayments,
  getPaymentHistory,
  getPaperExams,
  getOnlineExams,
  getParentDashboardAssignments,
  getGroupInfo,
  getStudentOverallStats
};