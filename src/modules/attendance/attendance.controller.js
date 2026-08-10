const attendanceService = require("./attendance.service");
const getAttendanceByGroupAndDate = async (req, res, next) => {
  try {
    const attendance = await attendanceService.getAttendanceByGroupAndDate(req.params.groupId, req.params.date);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

const getAttendanceByGroupAndMonth = async (req, res, next) => {
  try {
    const attendance = await attendanceService.getAttendanceByGroupAndMonth(req.params.groupId, req.params.month);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

const getGradeAttendanceStats = async (req, res, next) => {
  try {
    const stats = await attendanceService.getGradeAttendanceStats(req.params.gradeId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

const getOverallAttendanceStats = async (req, res, next) => {
  try {
    const stats = await attendanceService.getOverallAttendanceStats();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentsWithThreeConsecutiveAbsences = async (req, res, next) => {
  try {
    const students = await attendanceService.getStudentsWithThreeConsecutiveAbsences();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAttendanceByGroupAndDate,
  getAttendanceByGroupAndMonth,
  getGradeAttendanceStats,
  getOverallAttendanceStats,
  getStudentsWithThreeConsecutiveAbsences
};