const getPaymentsByGradeAndMonth = `
SELECT 
  p.id,
  p.student_id,
  s.full_name,
  p.amount,
  p.is_full_payment,
  p.remaining_before,
  p.remaining_after,
  p.payment_date,
  p.notes
FROM payments p
JOIN students s ON p.student_id = s.id AND s.deleted = 0
WHERE s.grade_id = $1 
  AND TO_CHAR(p.payment_date, 'YYYY-MM') = $2
  AND p.deleted = 0
ORDER BY p.payment_date DESC
`;

const getPaymentsByGroupAndMonth = `
SELECT 
  p.id,
  p.student_id,
  s.full_name,
  p.amount,
  p.is_full_payment,
  p.remaining_before,
  p.remaining_after,
  p.payment_date,
  p.notes
FROM payments p
JOIN students s ON p.student_id = s.id AND s.deleted = 0
WHERE s.group_id = $1 
  AND TO_CHAR(p.payment_date, 'YYYY-MM') = $2
  AND p.deleted = 0
ORDER BY p.payment_date DESC
`;

const getMonthlyCollections = `
SELECT 
  TO_CHAR(p.payment_date, 'YYYY-MM') AS month,
  COUNT(p.id) AS total_payments,
  COALESCE(SUM(p.amount), 0) AS total_collected,
  COUNT(DISTINCT p.student_id) AS students_paid
FROM payments p
WHERE p.deleted = 0
GROUP BY TO_CHAR(p.payment_date, 'YYYY-MM')
ORDER BY month DESC
`;

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
JOIN students s ON sub.student_id = s.id AND s.deleted = 0 AND s.active = 1
LEFT JOIN grades g ON s.grade_id = g.id
LEFT JOIN groups gr ON s.group_id = gr.id
WHERE sub.status = 'unpaid'
  AND EXTRACT(MONTH FROM sub.month) = EXTRACT(MONTH FROM CURRENT_DATE)
  AND EXTRACT(YEAR FROM sub.month) = EXTRACT(YEAR FROM CURRENT_DATE)
  AND sub.deleted = 0
ORDER BY s.full_name ASC
`;

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
JOIN students s ON g.id = s.grade_id AND s.deleted = 0 AND s.active = 1
LEFT JOIN subscriptions sub ON s.id = sub.student_id 
  AND EXTRACT(MONTH FROM sub.month) = EXTRACT(MONTH FROM CURRENT_DATE)
  AND EXTRACT(YEAR FROM sub.month) = EXTRACT(YEAR FROM CURRENT_DATE)
  AND sub.deleted = 0
LEFT JOIN LATERAL (
  SELECT COALESCE(SUM(payments.amount), 0) AS total_paid
  FROM payments
  WHERE payments.student_id = s.id 
    AND payments.subscription_id = sub.id
    AND payments.deleted = 0
) paid ON true
WHERE g.id = $1 AND g.deleted = 0
GROUP BY g.id, g.name
`;

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
JOIN students s ON gr.id = s.group_id AND s.deleted = 0 AND s.active = 1
LEFT JOIN subscriptions sub ON s.id = sub.student_id 
  AND EXTRACT(MONTH FROM sub.month) = EXTRACT(MONTH FROM CURRENT_DATE)
  AND EXTRACT(YEAR FROM sub.month) = EXTRACT(YEAR FROM CURRENT_DATE)
  AND sub.deleted = 0
LEFT JOIN LATERAL (
  SELECT COALESCE(SUM(payments.amount), 0) AS total_paid
  FROM payments
  WHERE payments.student_id = s.id 
    AND payments.subscription_id = sub.id
    AND payments.deleted = 0
) paid ON true
WHERE gr.id = $1 AND gr.deleted = 0
GROUP BY gr.id, gr.name, g.name
`;

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
  AND EXTRACT(MONTH FROM sub.month) = EXTRACT(MONTH FROM CURRENT_DATE)
  AND EXTRACT(YEAR FROM sub.month) = EXTRACT(YEAR FROM CURRENT_DATE)
  AND sub.deleted = 0
LEFT JOIN LATERAL (
  SELECT COALESCE(SUM(payments.amount), 0) AS total_paid
  FROM payments
  WHERE payments.student_id = s.id 
    AND payments.subscription_id = sub.id
    AND payments.deleted = 0
) paid ON true
WHERE s.deleted = 0 AND s.active = 1
`;
module.exports = {
  getPaymentsByGradeAndMonth,
  getPaymentsByGroupAndMonth,
  getMonthlyCollections,
  getUnpaidStudentsCurrentMonth,
  getGradePaymentStats,
  getGroupPaymentStats,
  getOverallPaymentStats,
};
