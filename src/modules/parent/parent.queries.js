const getStudentByParentToken = `
SELECT 
  s.id,
  s.barcode,
  s.full_name,
  s.phone,
  s.parent_phone,
  s.grade_id,
  g.name AS grade_name,
  s.group_id,
  gr.name AS group_name,
  s.platform_account_active,
  s.active
FROM students s
LEFT JOIN grades g ON s.grade_id = g.id AND g.deleted = 0
LEFT JOIN groups gr ON s.group_id = gr.id AND gr.deleted = 0
WHERE s.parent_token = $1 AND s.deleted = 0 AND s.active = 1
`;
const getParentDashboardAttendance = `
SELECT 
  COUNT(a.id) AS total_days,
  COUNT(CASE WHEN a.status = 'present' THEN 1 END) AS present_days,
  COUNT(CASE WHEN a.status = 'absent' THEN 1 END) AS absent_days,
  COUNT(CASE WHEN a.status = 'late' THEN 1 END) AS late_days,
  ROUND(
    (COUNT(CASE WHEN a.status = 'present' THEN 1 END)::numeric / 
    NULLIF(COUNT(a.id), 0)) * 100, 2
  ) AS attendance_percentage
FROM attendance a
WHERE a.student_id = $1 AND a.deleted = 0
`;

const getLastFiveAbsences = `
SELECT 
  a.attendance_date,
  a.status
FROM attendance a
WHERE a.student_id = $1 AND a.status = 'absent' AND a.deleted = 0
ORDER BY a.attendance_date DESC
LIMIT 5
`;

const getParentDashboardPayments = `
SELECT 
  COALESCE(SUM(sub.required_amount), 0) AS total_required,
  COALESCE(SUM(p.amount), 0) AS total_paid,
  COALESCE(SUM(sub.required_amount), 0) - COALESCE(SUM(p.amount), 0) AS remaining
FROM subscriptions sub
LEFT JOIN payments p ON sub.id = p.subscription_id AND p.student_id = $1 AND p.deleted = 0
WHERE sub.student_id = $1 AND sub.deleted = 0
`;

const getLastPayment = `
SELECT 
  p.amount,
  p.payment_date
FROM payments p
WHERE p.student_id = $1 AND p.deleted = 0
ORDER BY p.payment_date DESC
LIMIT 1
`;

const getLastFivePaperExams = `
SELECT 
  e.title,
  e.total_degree,
  e.exam_date,
  er.degree AS student_degree,
  ROUND((er.degree::numeric / NULLIF(e.total_degree::numeric, 0)) * 100, 2) AS percentage
FROM exam_results er
JOIN exams e ON er.exam_id = e.id AND e.deleted = 0
WHERE er.student_id = $1 AND er.deleted = 0
ORDER BY e.exam_date DESC
LIMIT 5
`;

const getLastFiveOnlineExams = `
SELECT 
  oe.title,
  oe.full_mark,
  se.score,
  se.total_questions,
  se.correct_answers,
  ROUND((se.score::numeric / NULLIF(oe.full_mark::numeric, 0)) * 100, 2) AS percentage,
  se.submitted_at
FROM student_exams se
JOIN online_exams oe ON se.exam_id = oe.id
WHERE se.student_id = $1
ORDER BY se.submitted_at DESC
LIMIT 5
`;

const getParentDashboardAssignments = `
SELECT 
  a.title,
  a.full_mark,
  a.deadline,
  asub.submitted_at,
  asub.score,
  CASE 
    WHEN asub.id IS NULL AND a.deadline < NOW() THEN 'overdue'
    WHEN asub.id IS NULL THEN 'pending'
    WHEN asub.score IS NOT NULL THEN 'graded'
    ELSE 'submitted'
  END AS status
FROM assignments a
LEFT JOIN assignment_submissions asub ON a.id = asub.assignment_id AND asub.student_id = $1
WHERE a.grade_id = (SELECT grade_id FROM students WHERE id = $1 AND deleted = 0)
ORDER BY a.deadline DESC
LIMIT 5
`;

const getGroupInfo = `
SELECT 
  gr.name AS group_name,
  gr.day,
  gr.days,
  gr.start_time,
  gr.end_time,
  gr.room,
  COUNT(DISTINCT s.id) AS students_count
FROM groups gr
JOIN students s ON gr.id = s.group_id AND s.deleted = 0 AND s.active = 1
WHERE gr.id = (SELECT group_id FROM students WHERE id = $1 AND deleted = 0)
  AND gr.deleted = 0
GROUP BY gr.id, gr.name, gr.day, gr.days, gr.start_time, gr.end_time, gr.room
`;

module.exports = {
  getStudentByParentToken,
  getParentDashboardAttendance,
  getLastFiveAbsences,
  getParentDashboardPayments,
  getLastPayment,
  getLastFivePaperExams,
  getLastFiveOnlineExams,
  getParentDashboardAssignments,
  getGroupInfo,
};
