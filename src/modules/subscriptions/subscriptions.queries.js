const getStudentSubscriptions = `
SELECT 
  sub.id,
  sub.month,
  sub.required_amount,
  sub.status,
  sub.created_at,
  COALESCE(SUM(p.amount), 0) AS paid_amount,
  sub.required_amount - COALESCE(SUM(p.amount), 0) AS remaining_amount
FROM subscriptions sub
LEFT JOIN payments p ON sub.id = p.subscription_id AND p.deleted = 0
WHERE sub.student_id = $1 AND sub.deleted = 0
GROUP BY sub.id, sub.month, sub.required_amount, sub.status, sub.created_at
ORDER BY sub.month DESC
`;

const getSubscriptionsByMonth = `
SELECT 
  sub.id,
  sub.student_id,
  s.full_name,
  s.barcode,
  g.name AS grade_name,
  gr.name AS group_name,
  sub.required_amount,
  sub.status,
  COALESCE(SUM(p.amount), 0) AS paid_amount,
  sub.required_amount - COALESCE(SUM(p.amount), 0) AS remaining_amount
FROM subscriptions sub
JOIN students s ON sub.student_id = s.id AND s.deleted = 0
LEFT JOIN grades g ON s.grade_id = g.id
LEFT JOIN groups gr ON s.group_id = gr.id
LEFT JOIN payments p ON sub.id = p.subscription_id AND p.deleted = 0
WHERE TO_CHAR(sub.month, 'YYYY-MM') = $1 AND sub.deleted = 0
GROUP BY sub.id, sub.student_id, s.full_name, s.barcode, g.name, gr.name, sub.required_amount, sub.status
ORDER BY s.full_name ASC
`;

const getStudentsWithoutSubscriptionCurrentMonth = `
SELECT 
  s.id,
  s.full_name,
  s.barcode,
  s.parent_phone,
  g.name AS grade_name,
  gr.name AS group_name
FROM students s
LEFT JOIN grades g ON s.grade_id = g.id
LEFT JOIN groups gr ON s.group_id = gr.id
WHERE s.deleted = 0 
  AND s.active = 1
  AND s.id NOT IN (
    SELECT sub.student_id
    FROM subscriptions sub
    WHERE EXTRACT(MONTH FROM sub.month) = EXTRACT(MONTH FROM CURRENT_DATE)
      AND EXTRACT(YEAR FROM sub.month) = EXTRACT(YEAR FROM CURRENT_DATE)
      AND sub.deleted = 0
  )
ORDER BY s.full_name ASC
`;

const getGradeSubscriptionStats = `
SELECT 
  g.id,
  g.name,
  COUNT(DISTINCT s.id) AS total_students,
  COUNT(DISTINCT sub.id) AS total_subscriptions,
  COALESCE(SUM(sub.required_amount), 0) AS total_required,
  COALESCE(SUM(p.amount), 0) AS total_paid,
  COALESCE(SUM(sub.required_amount), 0) - COALESCE(SUM(p.amount), 0) AS total_remaining
FROM grades g
JOIN students s ON g.id = s.grade_id AND s.deleted = 0 AND s.active = 1
LEFT JOIN subscriptions sub ON s.id = sub.student_id 
  AND EXTRACT(MONTH FROM sub.month) = EXTRACT(MONTH FROM CURRENT_DATE)
  AND EXTRACT(YEAR FROM sub.month) = EXTRACT(YEAR FROM CURRENT_DATE)
  AND sub.deleted = 0
LEFT JOIN payments p ON sub.id = p.subscription_id AND p.deleted = 0
WHERE g.id = $1 AND g.deleted = 0
GROUP BY g.id, g.name
`;

const getGroupSubscriptionStats = `
SELECT 
  gr.id,
  gr.name,
  g.name AS grade_name,
  COUNT(DISTINCT s.id) AS total_students,
  COUNT(DISTINCT sub.id) AS total_subscriptions,
  COALESCE(SUM(sub.required_amount), 0) AS total_required,
  COALESCE(SUM(p.amount), 0) AS total_paid,
  COALESCE(SUM(sub.required_amount), 0) - COALESCE(SUM(p.amount), 0) AS total_remaining
FROM groups gr
JOIN grades g ON gr.grade_id = g.id AND g.deleted = 0
JOIN students s ON gr.id = s.group_id AND s.deleted = 0 AND s.active = 1
LEFT JOIN subscriptions sub ON s.id = sub.student_id 
  AND EXTRACT(MONTH FROM sub.month) = EXTRACT(MONTH FROM CURRENT_DATE)
  AND EXTRACT(YEAR FROM sub.month) = EXTRACT(YEAR FROM CURRENT_DATE)
  AND sub.deleted = 0
LEFT JOIN payments p ON sub.id = p.subscription_id AND p.deleted = 0
WHERE gr.id = $1 AND gr.deleted = 0
GROUP BY gr.id, gr.name, g.name
`;

const getOverallSubscriptionStats = `
SELECT 
  COUNT(DISTINCT s.id) AS total_students,
  COUNT(DISTINCT sub.id) AS total_subscriptions,
  COALESCE(SUM(sub.required_amount), 0) AS total_required,
  COALESCE(SUM(p.amount), 0) AS total_paid,
  COALESCE(SUM(sub.required_amount), 0) - COALESCE(SUM(p.amount), 0) AS total_remaining
FROM students s
LEFT JOIN subscriptions sub ON s.id = sub.student_id 
  AND EXTRACT(MONTH FROM sub.month) = EXTRACT(MONTH FROM CURRENT_DATE)
  AND EXTRACT(YEAR FROM sub.month) = EXTRACT(YEAR FROM CURRENT_DATE)
  AND sub.deleted = 0
LEFT JOIN payments p ON sub.id = p.subscription_id AND p.deleted = 0
WHERE s.deleted = 0 AND s.active = 1
`;

module.exports = {
  getStudentSubscriptions,
  getSubscriptionsByMonth,
  getStudentsWithoutSubscriptionCurrentMonth,
  getGradeSubscriptionStats,
  getGroupSubscriptionStats,
  getOverallSubscriptionStats
};