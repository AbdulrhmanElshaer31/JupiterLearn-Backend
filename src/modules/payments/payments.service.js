const { query } = require("../../config/database");
const paymentQueries = require("./payments.queries");

const getPaymentsByGradeAndMonth = async (gradeId, month) => {
  const result = await query(paymentQueries.getPaymentsByGradeAndMonth, [gradeId, month]);
  return result.rows;
};

const getPaymentsByGroupAndMonth = async (groupId, month) => {
  const result = await query(paymentQueries.getPaymentsByGroupAndMonth, [groupId, month]);
  return result.rows;
};

const getMonthlyCollections = async () => {
  const result = await query(paymentQueries.getMonthlyCollections);
  return result.rows;
};

const getUnpaidStudentsCurrentMonth = async () => {
  const result = await query(paymentQueries.getUnpaidStudentsCurrentMonth);
  return result.rows;
};

const getGradePaymentStats = async (gradeId) => {
  const result = await query(paymentQueries.getGradePaymentStats, [gradeId]);
  return result.rows[0];
};

const getGroupPaymentStats = async (groupId) => {
  const result = await query(paymentQueries.getGroupPaymentStats, [groupId]);
  return result.rows[0];
};

const getOverallPaymentStats = async () => {
  const result = await query(paymentQueries.getOverallPaymentStats);
  return result.rows[0];
};

module.exports = {
  getPaymentsByGradeAndMonth,
  getPaymentsByGroupAndMonth,
  getMonthlyCollections,
  getUnpaidStudentsCurrentMonth,
  getGradePaymentStats,
  getGroupPaymentStats,
  getOverallPaymentStats
};