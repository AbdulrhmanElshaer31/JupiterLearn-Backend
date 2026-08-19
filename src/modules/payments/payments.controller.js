const paymentService = require("./payments.service");

const getPaymentsByGradeAndMonth = async (req, res, next) => {
  try {
    const payments = await paymentService.getPaymentsByGradeAndMonth(
      req.params.gradeId,
      req.params.month,
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

const getPaymentsByGroupAndMonth = async (req, res, next) => {
  try {
    const payments = await paymentService.getPaymentsByGroupAndMonth(
      req.params.groupId,
      req.params.month,
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

const getMonthlyCollections = async (req, res, next) => {
  try {
    const collections = await paymentService.getMonthlyCollections();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: collections,
    });
  } catch (error) {
    next(error);
  }
};

const getUnpaidStudentsCurrentMonth = async (req, res, next) => {
  try {
    const students = await paymentService.getUnpaidStudentsCurrentMonth();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

const getGradePaymentStats = async (req, res, next) => {
  try {
    const stats = await paymentService.getGradePaymentStats(req.params.gradeId);
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

const getGroupPaymentStats = async (req, res, next) => {
  try {
    const stats = await paymentService.getGroupPaymentStats(req.params.groupId);
    if (!stats) throw new Error("Group Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

const getOverallPaymentStats = async (req, res, next) => {
  try {
    const stats = await paymentService.getOverallPaymentStats();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

const getAllStudentsPaymentStatus = async (req, res, next) => {
  try {
    const students = await paymentService.getAllStudentsPaymentStatus();
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
  getPaymentsByGradeAndMonth,
  getPaymentsByGroupAndMonth,
  getMonthlyCollections,
  getUnpaidStudentsCurrentMonth,
  getGradePaymentStats,
  getGroupPaymentStats,
  getOverallPaymentStats,
  getAllStudentsPaymentStatus,
};
