const { query } = require("../../config/database");
const paymentQueries = require("./payments.queries");

// Create payment
const createPayment = async (paymentData) => {
  const { subscription_id, student_id, amount, payment_date, notes } =
    paymentData;
  const result = await query(paymentQueries.createPayment, [
    subscription_id,
    student_id,
    amount,
    payment_date,
    notes,
  ]);
  return result.rows[0];
};

// Get all payments with filters
const getAllPayments = async (filters) => {
  const { search = "", grade_id = null, group_id = null, page = 1 } = filters;
  const result = await query(paymentQueries.getAllPayments, [
    search,
    grade_id,
    group_id,
    page,
  ]);
  return result.rows;
};

// Get payment by ID
const getPaymentById = async (id) => {
  const result = await query(paymentQueries.getPaymentById, [id]);
  return result.rows[0];
};

// Update payment
const updatePayment = async (id, paymentData) => {
  const { amount, payment_date, notes } = paymentData;
  const result = await query(paymentQueries.updatePayment, [
    amount,
    payment_date,
    notes,
    id,
  ]);
  return result.rows[0];
};

// Delete payment
const deletePayment = async (id) => {
  const result = await query(paymentQueries.deletePayment, [id]);
  return result.rows[0];
};

// Get payments by grade and month
const getPaymentsByGradeAndMonth = async (gradeId, month) => {
  const result = await query(paymentQueries.getPaymentsByGradeAndMonth, [
    gradeId,
    month,
  ]);
  return result.rows;
};

// Get payments by group and month
const getPaymentsByGroupAndMonth = async (groupId, month) => {
  const result = await query(paymentQueries.getPaymentsByGroupAndMonth, [
    groupId,
    month,
  ]);
  return result.rows;
};

// Get monthly collections
const getMonthlyCollections = async () => {
  const result = await query(paymentQueries.getMonthlyCollections);
  return result.rows;
};

// Get unpaid students current month
const getUnpaidStudentsCurrentMonth = async () => {
  const result = await query(paymentQueries.getUnpaidStudentsCurrentMonth);
  return result.rows;
};

// Get grade payment stats
const getGradePaymentStats = async (gradeId) => {
  const result = await query(paymentQueries.getGradePaymentStats, [gradeId]);
  return result.rows[0];
};

// Get group payment stats
const getGroupPaymentStats = async (groupId) => {
  const result = await query(paymentQueries.getGroupPaymentStats, [groupId]);
  return result.rows[0];
};

// Get overall payment stats
const getOverallPaymentStats = async () => {
  const result = await query(paymentQueries.getOverallPaymentStats);
  return result.rows[0];
};

// Get all students payment status
const getAllStudentsPaymentStatus = async () => {
  const result = await query(paymentQueries.getAllStudentsPaymentStatus);
  return result.rows;
};

// Get payments count
const getPaymentsCount = async (filters) => {
  const { search = "", grade_id = null, group_id = null } = filters;
  const result = await query(paymentQueries.getPaymentsCount, [
    search,
    grade_id,
    group_id,
  ]);
  return result.rows[0];
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getPaymentsByGradeAndMonth,
  getPaymentsByGroupAndMonth,
  getMonthlyCollections,
  getUnpaidStudentsCurrentMonth,
  getGradePaymentStats,
  getGroupPaymentStats,
  getOverallPaymentStats,
  getAllStudentsPaymentStatus,
  getPaymentsCount,
};
