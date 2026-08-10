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

const getLastFiveAbsences = async (studentId) => {
  const result = await query(parentQueries.getLastFiveAbsences, [studentId]);
  return result.rows;
};

const getParentDashboardPayments = async (studentId) => {
  const result = await query(parentQueries.getParentDashboardPayments, [studentId]);
  return result.rows[0];
};

const getLastPayment = async (studentId) => {
  const result = await query(parentQueries.getLastPayment, [studentId]);
  return result.rows[0];
};

const getLastFivePaperExams = async (studentId) => {
  const result = await query(parentQueries.getLastFivePaperExams, [studentId]);
  return result.rows;
};

const getLastFiveOnlineExams = async (studentId) => {
  const result = await query(parentQueries.getLastFiveOnlineExams, [studentId]);
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

module.exports = {
  getStudentByParentToken,
  getParentDashboardAttendance,
  getLastFiveAbsences,
  getParentDashboardPayments,
  getLastPayment,
  getLastFivePaperExams,
  getLastFiveOnlineExams,
  getParentDashboardAssignments,
  getGroupInfo
};