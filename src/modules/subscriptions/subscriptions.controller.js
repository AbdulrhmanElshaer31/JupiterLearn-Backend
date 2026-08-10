const subscriptionService = require("./subscriptions.service");

const getStudentSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await subscriptionService.getStudentSubscriptions(req.params.studentId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

const getSubscriptionsByMonth = async (req, res, next) => {
  try {
    const subscriptions = await subscriptionService.getSubscriptionsByMonth(req.params.month);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentsWithoutSubscriptionCurrentMonth = async (req, res, next) => {
  try {
    const students = await subscriptionService.getStudentsWithoutSubscriptionCurrentMonth();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

const getGradeSubscriptionStats = async (req, res, next) => {
  try {
    const stats = await subscriptionService.getGradeSubscriptionStats(req.params.gradeId);
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

const getGroupSubscriptionStats = async (req, res, next) => {
  try {
    const stats = await subscriptionService.getGroupSubscriptionStats(req.params.groupId);
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

const getOverallSubscriptionStats = async (req, res, next) => {
  try {
    const stats = await subscriptionService.getOverallSubscriptionStats();
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
  getStudentSubscriptions,
  getSubscriptionsByMonth,
  getStudentsWithoutSubscriptionCurrentMonth,
  getGradeSubscriptionStats,
  getGroupSubscriptionStats,
  getOverallSubscriptionStats
};