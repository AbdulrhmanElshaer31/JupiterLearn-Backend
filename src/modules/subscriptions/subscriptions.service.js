const { query } = require("../../config/database");
const subscriptionQueries = require("./subscriptions.queries");

const getStudentSubscriptions = async (studentId) => {
  const result = await query(subscriptionQueries.getStudentSubscriptions, [studentId]);
  return result.rows;
};

const getSubscriptionsByMonth = async (month) => {
  const result = await query(subscriptionQueries.getSubscriptionsByMonth, [month]);
  return result.rows;
};

const getStudentsWithoutSubscriptionCurrentMonth = async () => {
  const result = await query(subscriptionQueries.getStudentsWithoutSubscriptionCurrentMonth);
  return result.rows;
};

const getGradeSubscriptionStats = async (gradeId) => {
  const result = await query(subscriptionQueries.getGradeSubscriptionStats, [gradeId]);
  return result.rows[0];
};

const getGroupSubscriptionStats = async (groupId) => {
  const result = await query(subscriptionQueries.getGroupSubscriptionStats, [groupId]);
  return result.rows[0];
};

const getOverallSubscriptionStats = async () => {
  const result = await query(subscriptionQueries.getOverallSubscriptionStats);
  return result.rows[0];
};

module.exports = {
  getStudentSubscriptions,
  getSubscriptionsByMonth,
  getStudentsWithoutSubscriptionCurrentMonth,
  getGradeSubscriptionStats,
  getGroupSubscriptionStats,
  getOverallSubscriptionStats
};