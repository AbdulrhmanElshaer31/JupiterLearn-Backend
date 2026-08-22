const { query } = require("../../config/database");
const attendanceQueries = require("./attendance.queries");

// Create or update attendance record (Upsert)
const createAttendance = async (attendanceData) => {
  const {
    student_id,
    group_id,
    grade_id,
    attendance_date,
    status,
    attendance_time,
    method = "manual",
    is_makeup = 0,
    makeup_group_id = null,
    notes = null,
  } = attendanceData;

  const result = await query(attendanceQueries.createAttendance, [
    student_id,
    group_id,
    grade_id,
    attendance_date,
    status,
    attendance_time,
    method,
    is_makeup,
    makeup_group_id,
    notes,
  ]);
  return result.rows[0];
};

// Get attendance by group and date
const getAttendanceByGroupAndDate = async (groupId, date) => {
  const result = await query(attendanceQueries.getAttendanceByGroupAndDate, [
    groupId,
    date,
  ]);
  return result.rows;
};

// Get attendance by group and month
const getAttendanceByGroupAndMonth = async (groupId, month, page = 1) => {
  const result = await query(attendanceQueries.getAttendanceByGroupAndMonth, [
    groupId,
    month,
    page,
  ]);
  return result.rows;
};

// Get attendance summary
const getAttendanceSummary = async (groupId, date) => {
  const result = await query(attendanceQueries.getAttendanceSummary, [
    groupId,
    date,
  ]);
  return result.rows[0];
};

// Mark all unmarked students as absent
const markRestAbsent = async (groupId, date) => {
  const result = await query(attendanceQueries.markRestAbsent, [groupId, date]);
  return result.rows;
};

// Get grade attendance stats
const getGradeAttendanceStats = async (gradeId) => {
  const result = await query(attendanceQueries.getGradeAttendanceStats, [
    gradeId,
  ]);
  return result.rows;
};

// Get overall attendance stats
const getOverallAttendanceStats = async () => {
  const result = await query(attendanceQueries.getOverallAttendanceStats);
  return result.rows;
};

// Get students with 3+ consecutive absences
const getStudentsWithThreeConsecutiveAbsences = async () => {
  const result = await query(
    attendanceQueries.getStudentsWithThreeConsecutiveAbsences,
  );
  return result.rows;
};

// Get attendance by ID
const getAttendanceById = async (id) => {
  const result = await query(attendanceQueries.getAttendanceById, [id]);
  return result.rows[0];
};

// Update attendance record
const updateAttendance = async (id, attendanceData) => {
  const { status, attendance_time, method, is_makeup, makeup_group_id, notes } =
    attendanceData;

  const result = await query(attendanceQueries.updateAttendance, [
    status,
    attendance_time,
    method,
    is_makeup,
    makeup_group_id,
    notes,
    id,
  ]);
  return result.rows[0];
};

// Delete attendance record
const deleteAttendance = async (id) => {
  const result = await query(attendanceQueries.deleteAttendance, [id]);
  return result.rows[0];
};

// Get dashboard stats
const getDashboard = async () => {
  const result = await query(attendanceQueries.getDashboard);
  return result.rows[0];
};

module.exports = {
  createAttendance,
  getAttendanceByGroupAndDate,
  getAttendanceByGroupAndMonth,
  getAttendanceSummary,
  markRestAbsent,
  getGradeAttendanceStats,
  getOverallAttendanceStats,
  getStudentsWithThreeConsecutiveAbsences,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
  getDashboard,
};
