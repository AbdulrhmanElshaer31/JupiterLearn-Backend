const { query } = require("../../config/database");
const attendanceQueries = require("./attendance.queries");

const getAttendanceByGroupAndDate = async (groupId, date) => {
  const result = await query(attendanceQueries.getAttendanceByGroupAndDate, [groupId, date]);
  return result.rows;
};

const getAttendanceByGroupAndMonth = async (groupId, month) => {
  const result = await query(attendanceQueries.getAttendanceByGroupAndMonth, [groupId, month]);
  return result.rows;
};

const getGradeAttendanceStats = async (gradeId) => {
  const result = await query(attendanceQueries.getGradeAttendanceStats, [gradeId]);
  return result.rows;
};

const getOverallAttendanceStats = async () => {
  const result = await query(attendanceQueries.getOverallAttendanceStats);
  return result.rows;
};

const getStudentsWithThreeConsecutiveAbsences = async () => {
  const result = await query(attendanceQueries.getStudentsWithThreeConsecutiveAbsences);
  return result.rows;
};

module.exports = {
  getAttendanceByGroupAndDate,
  getAttendanceByGroupAndMonth,
  getGradeAttendanceStats,
  getOverallAttendanceStats,
  getStudentsWithThreeConsecutiveAbsences
};