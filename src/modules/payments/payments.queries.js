/* ============================================
   PAYMENTS QUERIES
   ============================================ */

// Create a new payment
const createPayment = `
INSERT INTO payments (subscription_id, student_id, amount, payment_date, notes)
VALUES ($1, $2, $3, $4, $5)
RETURNING *
`;

// Get all payments with filters - 20 per page
const getAllPayments = `
SELECT 
  p.id,
  p.subscription_id,
  p.student_id,
  s.full_name AS student_name,
  s.barcode,
  p.amount,
  p.payment_date,
  p.notes,
  sub.month AS subscription_month,
  sub.required_amount
FROM payments p
JOIN students s ON p.student_id = s.id AND s.deleted = 0
LEFT JOIN subscriptions sub ON p.subscription_id = sub.id
WHERE ($1 = '' OR s.full_name ILIKE $1 OR s.barcode ILIKE $1)
  AND ($2::int IS NULL OR s.grade_id = $2::int)
  AND ($3::int IS NULL OR s.group_id = $3::int)
ORDER BY p.payment_date DESC
LIMIT 20 OFFSET (($4::int - 1) * 20)
`;

// Get payment by ID
const getPaymentById = `
SELECT 
  p.id,
  p.subscription_id,
  p.student_id,
  s.full_name AS student_name,
  p.amount,
  p.payment_date,
  p.notes,
  sub.month AS subscription_month,
  sub.required_amount
FROM payments p
JOIN students s ON p.student_id = s.id
LEFT JOIN subscriptions sub ON p.subscription_id = sub.id
WHERE p.id = $1
`;

// Update payment
const updatePayment = `
UPDATE payments
SET 
  amount = $1,
  payment_date = $2,
  notes = $3
WHERE id = $4
RETURNING *
`;

// Delete payment
const deletePayment = `
DELETE FROM payments
WHERE id = $1
RETURNING *
`;

// Get payments by grade and month
const getPaymentsByGradeAndMonth = `
SELECT 
  p.id,
  p.student_id,
  s.full_name,
  p.amount,
  p.payment_date,
  p.notes
FROM payments p
JOIN students s ON p.student_id = s.id AND s.deleted = 0
WHERE s.grade_id = $1 
  AND TO_CHAR(p.payment_date, 'YYYY-MM') = $2
ORDER BY p.payment_date DESC
`;

// Get payments by group and month
const getPaymentsByGroupAndMonth = `
SELECT 
  p.id,
  p.student_id,
  s.full_name,
  p.amount,
  p.payment_date,
  p.notes
FROM payments p
JOIN students s ON p.student_id = s.id AND s.deleted = 0
WHERE s.group_id = $1 
  AND TO_CHAR(p.payment_date, 'YYYY-MM') = $2
ORDER BY p.payment_date DESC
`;

// Get monthly collections
const getMonthlyCollections = `
SELECT 
  TO_CHAR(p.payment_date, 'YYYY-MM') AS month,
  COUNT(p.id) AS total_payments,
  COALESCE(SUM(p.amount), 0) AS total_collected,
  COUNT(DISTINCT p.student_id) AS students_paid
FROM payments p
GROUP BY TO_CHAR(p.payment_date, 'YYYY-MM')
ORDER BY month DESC
`;

// Get unpaid students current month
const getUnpaidStudentsCurrentMonth = `
SELECT 
  s.id,
  s.full_name,
  s.barcode,
  s.parent_phone,
  g.name AS grade_name,
  gr.name AS group_name,
  sub.required_amount,
  sub.status
FROM subscriptions sub
JOIN students s ON sub.student_id = s.id AND s.deleted = 0
LEFT JOIN grades g ON s.grade_id = g.id
LEFT JOIN groups gr ON s.group_id = gr.id
WHERE sub.status = 'unpaid'
  AND sub.month = TO_CHAR(CURRENT_DATE, 'YYYY-MM')
  AND sub.deleted = 0
ORDER BY s.full_name ASC
`;

// Get grade payment stats
const getGradePaymentStats = `
SELECT 
  g.id,
  g.name,
  COUNT(DISTINCT s.id) AS total_students,
  COALESCE(SUM(sub.required_amount), 0) AS total_required,
  COALESCE(SUM(paid.total_paid), 0) AS total_paid,
  COALESCE(SUM(sub.required_amount), 0) - COALESCE(SUM(paid.total_paid), 0) AS total_remaining,
  COUNT(DISTINCT CASE WHEN COALESCE(paid.total_paid, 0) >= sub.required_amount THEN s.id END) AS fully_paid,
  COUNT(DISTINCT CASE WHEN COALESCE(paid.total_paid, 0) > 0 AND COALESCE(paid.total_paid, 0) < sub.required_amount THEN s.id END) AS partially_paid,
  COUNT(DISTINCT CASE WHEN COALESCE(paid.total_paid, 0) = 0 OR paid.total_paid IS NULL THEN s.id END) AS not_paid
FROM grades g
JOIN students s ON g.id = s.grade_id AND s.deleted = 0
LEFT JOIN subscriptions sub ON s.id = sub.student_id 
  AND sub.month = TO_CHAR(CURRENT_DATE, 'YYYY-MM')
  AND sub.deleted = 0
LEFT JOIN LATERAL (
  SELECT COALESCE(SUM(payments.amount), 0) AS total_paid
  FROM payments
  WHERE payments.student_id = s.id 
    AND payments.subscription_id = sub.id
) paid ON true
WHERE g.id = $1 AND g.deleted = 0
GROUP BY g.id, g.name
`;

// Get group payment stats
const getGroupPaymentStats = `
SELECT 
  gr.id,
  gr.name,
  g.name AS grade_name,
  COUNT(DISTINCT s.id) AS total_students,
  COALESCE(SUM(sub.required_amount), 0) AS total_required,
  COALESCE(SUM(paid.total_paid), 0) AS total_paid,
  COALESCE(SUM(sub.required_amount), 0) - COALESCE(SUM(paid.total_paid), 0) AS total_remaining,
  COUNT(DISTINCT CASE WHEN COALESCE(paid.total_paid, 0) >= sub.required_amount THEN s.id END) AS fully_paid,
  COUNT(DISTINCT CASE WHEN COALESCE(paid.total_paid, 0) > 0 AND COALESCE(paid.total_paid, 0) < sub.required_amount THEN s.id END) AS partially_paid,
  COUNT(DISTINCT CASE WHEN COALESCE(paid.total_paid, 0) = 0 OR paid.total_paid IS NULL THEN s.id END) AS not_paid
FROM groups gr
JOIN grades g ON gr.grade_id = g.id AND g.deleted = 0
JOIN students s ON gr.id = s.group_id AND s.deleted = 0
LEFT JOIN subscriptions sub ON s.id = sub.student_id 
  AND sub.month = TO_CHAR(CURRENT_DATE, 'YYYY-MM')
  AND sub.deleted = 0
LEFT JOIN LATERAL (
  SELECT COALESCE(SUM(payments.amount), 0) AS total_paid
  FROM payments
  WHERE payments.student_id = s.id 
    AND payments.subscription_id = sub.id
) paid ON true
WHERE gr.id = $1 AND gr.deleted = 0
GROUP BY gr.id, gr.name, g.name
`;

// Get overall payment stats
const getOverallPaymentStats = `
SELECT 
  COUNT(DISTINCT s.id) AS total_students,
  COALESCE(SUM(sub.required_amount), 0) AS total_required,
  COALESCE(SUM(paid.total_paid), 0) AS total_paid,
  COALESCE(SUM(sub.required_amount), 0) - COALESCE(SUM(paid.total_paid), 0) AS total_remaining,
  COUNT(DISTINCT CASE WHEN COALESCE(paid.total_paid, 0) >= sub.required_amount THEN s.id END) AS fully_paid,
  COUNT(DISTINCT CASE WHEN COALESCE(paid.total_paid, 0) > 0 AND COALESCE(paid.total_paid, 0) < sub.required_amount THEN s.id END) AS partially_paid,
  COUNT(DISTINCT CASE WHEN COALESCE(paid.total_paid, 0) = 0 OR paid.total_paid IS NULL THEN s.id END) AS not_paid
FROM students s
LEFT JOIN subscriptions sub ON s.id = sub.student_id 
  AND sub.month = TO_CHAR(CURRENT_DATE, 'YYYY-MM')
  AND sub.deleted = 0
LEFT JOIN LATERAL (
  SELECT COALESCE(SUM(payments.amount), 0) AS total_paid
  FROM payments
  WHERE payments.student_id = s.id 
    AND payments.subscription_id = sub.id
) paid ON true
WHERE s.deleted = 0
`;

// Get all students payment status
const getAllStudentsPaymentStatus = `
SELECT 
  s.id,
  s.barcode,
  s.full_name,
  s.grade_id,
  g.name AS grade_name,
  s.group_id,
  gr.name AS group_name,
  COALESCE(paid.total_paid, 0) AS paid_amount,
  sub.required_amount,
  CASE 
    WHEN COALESCE(paid.total_paid, 0) >= sub.required_amount THEN 'paid'
    ELSE 'unpaid'
  END AS payment_status
FROM students s
LEFT JOIN grades g ON s.grade_id = g.id AND g.deleted = 0
LEFT JOIN groups gr ON s.group_id = gr.id AND gr.deleted = 0
LEFT JOIN subscriptions sub ON s.id = sub.student_id 
  AND sub.month = TO_CHAR(CURRENT_DATE, 'YYYY-MM')
  AND sub.deleted = 0
LEFT JOIN LATERAL (
  SELECT COALESCE(SUM(p.amount), 0) AS total_paid
  FROM payments p
  WHERE p.student_id = s.id 
    AND p.subscription_id = sub.id
) paid ON true
WHERE s.deleted = 0
ORDER BY s.full_name ASC
`;

// Get payments count with filters
const getPaymentsCount = `
SELECT COUNT(*) AS count
FROM payments p
JOIN students s ON p.student_id = s.id AND s.deleted = 0
WHERE ($1 = '' OR s.full_name ILIKE $1 OR s.barcode ILIKE $1)
  AND ($2::int IS NULL OR s.grade_id = $2::int)
  AND ($3::int IS NULL OR s.group_id = $3::int)
`;

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
