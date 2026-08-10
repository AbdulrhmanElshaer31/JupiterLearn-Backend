const gradeService = require("./grades.service");

const getAllGrades = async (req, res, next) => {
  try {
    const grades = await gradeService.getAllGrades();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: grades,
    });
  } catch (error) {
    next(error);
  }
};

const getGradeById = async (req, res, next) => {
  try {
    const grade = await gradeService.getGradeById(req.params.gradeId);
    if (!grade) throw new Error("Grade Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: grade,
    });
  } catch (error) {
    next(error);
  }
};

const getActiveGrades = async (req, res, next) => {
  try {
    const grades = await gradeService.getActiveGrades();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: grades,
    });
  } catch (error) {
    next(error);
  }
};

const getInactiveGrades = async (req, res, next) => {
  try {
    const grades = await gradeService.getInactiveGrades();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: grades,
    });
  } catch (error) {
    next(error);
  }
};

const getGradeStats = async (req, res, next) => {
  try {
    const stats = await gradeService.getGradeStats(req.params.gradeId);
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

const getAllGradesStats = async (req, res, next) => {
  try {
    const stats = await gradeService.getAllGradesStats();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllGrades,
  getGradeById,
  getActiveGrades,
  getInactiveGrades,
  getGradeStats,
  getAllGradesStats
};