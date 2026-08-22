const attendanceService = require("./attendance.service");

// Create or update attendance
const createAttendance = async (req, res, next) => {
  try {
    const attendance = await attendanceService.createAttendance(req.body);

    if (!attendance) {
      throw new Error("فشل تسجيل الحضور حاول مرة أخرى!");
    }

    return res.status(201).json({
      success: true,
      message: "تم تسجيل الحضور بنجاح!",
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

// Get attendance by group and date
const getAttendanceByGroupAndDate = async (req, res, next) => {
  try {
    const { groupId, date } = req.params;

    const attendance = await attendanceService.getAttendanceByGroupAndDate(
      groupId,
      date,
    );

    if (!attendance) {
      throw new Error("فشل تحميل الحضور حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل الحضور بنجاح!",
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

// Get attendance by group and month
const getAttendanceByGroupAndMonth = async (req, res, next) => {
  try {
    const { groupId, month } = req.params;
    const page = parseInt(req.query.page) || 1;

    const attendance = await attendanceService.getAttendanceByGroupAndMonth(
      groupId,
      month,
      page,
    );

    if (!attendance) {
      throw new Error("فشل تحميل الحضور حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل الحضور بنجاح!",
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

// Get attendance summary
const getAttendanceSummary = async (req, res, next) => {
  try {
    const { groupId, date } = req.params;

    const summary = await attendanceService.getAttendanceSummary(groupId, date);

    if (!summary) {
      throw new Error("فشل تحميل الملخص حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل الملخص بنجاح!",
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};

// Mark rest as absent
const markRestAbsent = async (req, res, next) => {
  try {
    const { groupId, date } = req.body;

    const result = await attendanceService.markRestAbsent(groupId, date);

    if (!result) {
      throw new Error("فشل تسجيل الغياب حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تسجيل الغياب بنجاح!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Get grade attendance stats
const getGradeAttendanceStats = async (req, res, next) => {
  try {
    const { gradeId } = req.params;

    const stats = await attendanceService.getGradeAttendanceStats(gradeId);

    if (!stats) {
      throw new Error("فشل تحميل الإحصائيات حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل الإحصائيات بنجاح!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

// Get overall attendance stats
const getOverallAttendanceStats = async (req, res, next) => {
  try {
    const stats = await attendanceService.getOverallAttendanceStats();

    if (!stats) {
      throw new Error("فشل تحميل الإحصائيات حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل الإحصائيات بنجاح!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

// Get students with 3+ consecutive absences
const getStudentsWithThreeConsecutiveAbsences = async (req, res, next) => {
  try {
    const students =
      await attendanceService.getStudentsWithThreeConsecutiveAbsences();

    if (!students) {
      throw new Error("فشل تحميل الطلاب حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل الطلاب بنجاح!",
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

// Get attendance by ID
const getAttendanceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const attendance = await attendanceService.getAttendanceById(id);

    if (!attendance) {
      throw new Error("فشل تحميل سجل الحضور حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل سجل الحضور بنجاح!",
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

// Update attendance
const updateAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;

    const attendance = await attendanceService.updateAttendance(id, req.body);

    if (!attendance) {
      throw new Error("فشل تعديل الحضور حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تعديل الحضور بنجاح!",
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

// Delete attendance
const deleteAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;

    const attendance = await attendanceService.deleteAttendance(id);

    if (!attendance) {
      throw new Error("فشل حذف سجل الحضور حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم حذف سجل الحضور بنجاح!",
      data: attendance,
    });
  } catch (error) {
    next(error);
  }
};

// Get dashboard stats
const getDashboard = async (req, res, next) => {
  try {
    const stats = await attendanceService.getDashboard();

    if (!stats) {
      throw new Error("فشل تحميل الإحصائيات حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل الإحصائيات بنجاح!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
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
