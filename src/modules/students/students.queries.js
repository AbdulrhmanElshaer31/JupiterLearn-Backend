const getStudentProfile = `
SELECT 
  s.id,
  s.barcode,
  s.full_name,
  s.phone,
  s.parent_phone,
  s.platform_account_active,
  s.active,
  s.notes,
  s.grade_id,
  s.group_id,
  g.name AS grade_name,
  g.monthly_price,
  g.platform_enabled,
  g.whatsapp_group_link,
  gr.name AS group_name,
  gr.day,
  gr.days,
  gr.start_time,
  gr.end_time,
  gr.room
FROM students s
LEFT JOIN grades g ON s.grade_id = g.id AND g.deleted = 0
LEFT JOIN groups gr ON s.group_id = gr.id AND gr.deleted = 0
WHERE s.id = $1 AND s.deleted = 0
`;

const getStudentQuickStats = `
SELECT 
  COUNT(a.id) AS total_attendance_days,
  COUNT(CASE WHEN a.status = 'present' THEN 1 END) AS present_days,
  COUNT(CASE WHEN a.status = 'absent' THEN 1 END) AS absent_days,
  COUNT(CASE WHEN a.status = 'late' THEN 1 END) AS late_days,
  ROUND(
    (COUNT(CASE WHEN a.status = 'present' THEN 1 END)::numeric / 
    NULLIF(COUNT(a.id), 0)) * 100, 2
  ) AS attendance_percentage,
  (
    SELECT ROUND(AVG(er.degree)::numeric, 2)
    FROM exam_results er
    JOIN exams e ON er.exam_id = e.id
    WHERE er.student_id = $1 AND er.deleted = 0 AND e.deleted = 0
  ) AS avg_exam_degree,
  (
    SELECT COUNT(*)
    FROM student_exams se
    WHERE se.student_id = $1
  ) AS total_online_exams,
  (
    SELECT COALESCE(SUM(p.amount), 0)
    FROM payments p
    WHERE p.student_id = $1 AND p.deleted = 0
  ) AS total_paid,
  (
    SELECT COALESCE(SUM(sub.required_amount), 0)
    FROM subscriptions sub
    WHERE sub.student_id = $1 AND sub.deleted = 0
  ) AS total_fees
FROM attendance a
WHERE a.student_id = $1 AND a.deleted = 0
`;

const getAttendanceHistory = `
SELECT 
  a.id,
  a.attendance_date,
  a.status,
  a.attendance_time,
  a.method,
  a.is_makeup,
  a.notes,
  gr.name AS group_name
FROM attendance a
LEFT JOIN groups gr ON a.group_id = gr.id
WHERE a.student_id = $1 AND a.deleted = 0
ORDER BY a.attendance_date DESC
LIMIT $2 OFFSET $3
`;

const getMonthlyAttendanceStats = `
SELECT 
  TO_CHAR(a.attendance_date, 'YYYY-MM') AS month,
  COUNT(a.id) AS total_days,
  COUNT(CASE WHEN a.status = 'present' THEN 1 END) AS present_days,
  COUNT(CASE WHEN a.status = 'absent' THEN 1 END) AS absent_days,
  ROUND(
    (COUNT(CASE WHEN a.status = 'present' THEN 1 END)::numeric / 
    NULLIF(COUNT(a.id), 0)) * 100, 2
  ) AS percentage
FROM attendance a
WHERE a.student_id = $1 AND a.deleted = 0
GROUP BY TO_CHAR(a.attendance_date, 'YYYY-MM')
ORDER BY month DESC
`;

const getConsecutiveAbsences = `
WITH ranked_attendance AS (
  SELECT 
    a.attendance_date,
    a.status,
    SUM(CASE WHEN a.status != 'absent' THEN 1 ELSE 0 END) 
      OVER (ORDER BY a.attendance_date DESC) AS group_id
  FROM attendance a
  WHERE a.student_id = $1 AND a.deleted = 0
)
SELECT COUNT(*) AS consecutive_absences
FROM ranked_attendance
WHERE status = 'absent' AND group_id = 0
`;

const getPaymentHistory = `
SELECT 
  p.id,
  p.amount,
  p.is_full_payment,
  p.remaining_before,
  p.remaining_after,
  p.payment_date,
  p.notes,
  sub.month AS subscription_month,
  sub.required_amount AS subscription_amount
FROM payments p
LEFT JOIN subscriptions sub ON p.subscription_id = sub.id
WHERE p.student_id = $1 AND p.deleted = 0
ORDER BY p.payment_date DESC
LIMIT $2 OFFSET $3
`;

const getRemainingBalance = `
SELECT 
  COALESCE(SUM(sub.required_amount), 0) AS total_required,
  COALESCE(SUM(p.amount), 0) AS total_paid,
  COALESCE(SUM(sub.required_amount), 0) - COALESCE(SUM(p.amount), 0) AS remaining
FROM subscriptions sub
LEFT JOIN payments p ON sub.id = p.subscription_id AND p.student_id = $1 AND p.deleted = 0
WHERE sub.student_id = $1 AND sub.deleted = 0
`;

const getCurrentSubscription = `
SELECT 
  sub.id,
  sub.month,
  sub.required_amount,
  sub.status,
  COALESCE(SUM(p.amount), 0) AS paid_amount,
  sub.required_amount - COALESCE(SUM(p.amount), 0) AS remaining_amount,
  CASE 
    WHEN COALESCE(SUM(p.amount), 0) >= sub.required_amount THEN 'paid'
    WHEN COALESCE(SUM(p.amount), 0) > 0 THEN 'partial'
    ELSE 'unpaid'
  END AS payment_status
FROM subscriptions sub
LEFT JOIN payments p ON sub.id = p.subscription_id AND p.deleted = 0
WHERE sub.student_id = $1 
  AND sub.deleted = 0
  AND EXTRACT(MONTH FROM sub.month) = EXTRACT(MONTH FROM CURRENT_DATE)
  AND EXTRACT(YEAR FROM sub.month) = EXTRACT(YEAR FROM CURRENT_DATE)
GROUP BY sub.id, sub.month, sub.required_amount, sub.status
`;

const getStudentPaperExams = `
SELECT 
  e.id,
  e.title,
  e.total_degree,
  e.exam_date,
  e.notes,
  er.degree AS student_degree,
  CASE 
    WHEN er.degree IS NOT NULL THEN ROUND((er.degree::numeric / NULLIF(e.total_degree::numeric, 0)) * 100, 2)
    ELSE NULL
  END AS percentage
FROM exams e
LEFT JOIN exam_results er ON e.id = er.exam_id AND er.student_id = $1 AND er.deleted = 0
WHERE e.grade_id = (
    SELECT grade_id FROM students WHERE id = $1 AND deleted = 0
  )
  AND e.deleted = 0
ORDER BY e.exam_date DESC
LIMIT $2 OFFSET $3
`;

const getStudentExamResults = `
SELECT 
  er.id,
  er.degree,
  er.notes,
  e.title AS exam_title,
  e.total_degree,
  e.exam_date,
  g.name AS grade_name
FROM exam_results er
JOIN exams e ON er.exam_id = e.id
JOIN grades g ON e.grade_id = g.id
WHERE er.student_id = $1 AND er.deleted = 0
ORDER BY e.exam_date DESC
`;

const getAvailableOnlineExams = `
SELECT 
  oe.id,
  oe.title,
  oe.description,
  oe.duration_minutes,
  oe.full_mark,
  oe.start_at,
  oe.end_at,
  oe.randomize_questions,
  g.name AS grade_name,
  COUNT(q.id) AS questions_count,
  CASE 
    WHEN se.id IS NOT NULL THEN 'completed'
    WHEN oe.start_at > NOW() THEN 'upcoming'
    WHEN oe.end_at < NOW() THEN 'expired'
    ELSE 'available'
  END AS exam_status
FROM online_exams oe
JOIN grades g ON oe.grade_id = g.id
LEFT JOIN questions q ON oe.id = q.exam_id
LEFT JOIN student_exams se ON oe.id = se.exam_id AND se.student_id = $1
WHERE oe.grade_id = (
    SELECT grade_id FROM students WHERE id = $1 AND deleted = 0
  )
GROUP BY oe.id, g.name, se.id
ORDER BY oe.start_at DESC
LIMIT $2 OFFSET $3
`;

const getStudentOnlineExams = `
SELECT 
  se.id,
  se.score,
  se.total_questions,
  se.correct_answers,
  se.started_at,
  se.submitted_at,
  oe.title AS exam_title,
  oe.full_mark,
  ROUND((se.score::numeric / NULLIF(oe.full_mark::numeric, 0)) * 100, 2) AS percentage,
  CASE 
    WHEN se.score >= (oe.full_mark * 0.5) THEN 'passed'
    ELSE 'failed'
  END AS result_status
FROM student_exams se
JOIN online_exams oe ON se.exam_id = oe.id
WHERE se.student_id = $1
ORDER BY se.submitted_at DESC
LIMIT $2 OFFSET $3
`;

const getStudentExamAnswers = `
SELECT 
  sa.id,
  sa.is_correct,
  sa.submitted_at,
  q.question_text,
  q.type AS question_type,
  o.option_text AS selected_option_text,
  correct_o.option_text AS correct_option_text
FROM student_answers sa
JOIN questions q ON sa.question_id = q.id
LEFT JOIN options o ON sa.selected_option_id = o.id
LEFT JOIN options correct_o ON q.id = correct_o.question_id AND correct_o.is_correct = 1
WHERE sa.exam_id = $1 AND sa.student_id = $2
ORDER BY q."order"
`;

const getStudentAssignments = `
SELECT 
  a.id,
  a.title,
  a.description,
  a.file_path,
  a.full_mark,
  a.deadline,
  a.is_closed,
  g.name AS grade_name,
  asub.id AS submission_id,
  asub.submitted_at,
  asub.score AS submission_score,
  asub.feedback,
  CASE 
    WHEN asub.id IS NULL AND a.deadline < NOW() THEN 'overdue'
    WHEN asub.id IS NULL THEN 'pending'
    WHEN asub.score IS NOT NULL THEN 'graded'
    ELSE 'submitted'
  END AS assignment_status
FROM assignments a
JOIN grades g ON a.grade_id = g.id
LEFT JOIN assignment_submissions asub ON a.id = asub.assignment_id AND asub.student_id = $1
WHERE a.grade_id = (
    SELECT grade_id FROM students WHERE id = $1 AND deleted = 0
  )
ORDER BY a.deadline DESC
LIMIT $2 OFFSET $3
`;

const getStudentSubmissions = `
SELECT 
  asub.id,
  asub.file_path,
  asub.score,
  asub.feedback,
  asub.submitted_at,
  asub.reviewed_at,
  a.title AS assignment_title,
  a.full_mark,
  a.deadline,
  g.name AS grade_name,
  CASE 
    WHEN asub.submitted_at > a.deadline THEN 'late'
    ELSE 'on_time'
  END AS submission_timing
FROM assignment_submissions asub
JOIN assignments a ON asub.assignment_id = a.id
JOIN grades g ON a.grade_id = g.id
WHERE asub.student_id = $1
ORDER BY asub.submitted_at DESC
LIMIT $2 OFFSET $3
`;

const getStudentPlaylists = `
SELECT 
  p.id,
  p.title,
  p.description,
  p.is_active,
  g.name AS grade_name,
  COUNT(pv.video_id) AS videos_count
FROM playlists p
JOIN grades g ON p.grade_id = g.id
LEFT JOIN playlist_videos pv ON p.id = pv.playlist_id
WHERE p.grade_id = (
    SELECT grade_id FROM students WHERE id = $1 AND deleted = 0
  )
  AND p.is_active = 1
GROUP BY p.id, p.title, p.description, p.is_active, g.name
`;

const getPlaylistVideos = `
SELECT 
  v.id,
  v.title,
  v.description,
  v.youtube_url,
  v.is_active
FROM videos v
JOIN playlist_videos pv ON v.id = pv.video_id
WHERE pv.playlist_id = $1
  AND v.is_active = 1
`;

const getAllStudents = `
SELECT 
  s.id,
  s.barcode,
  s.full_name,
  s.phone,
  s.parent_phone,
  s.platform_account_active,
  s.active,
  s.grade_id,
  g.name AS grade_name,
  s.group_id,
  gr.name AS group_name
FROM students s
LEFT JOIN grades g ON s.grade_id = g.id AND g.deleted = 0
LEFT JOIN groups gr ON s.group_id = gr.id AND gr.deleted = 0
WHERE s.deleted = 0
ORDER BY s.full_name ASC
`;

const getStudentByBarcode = `
SELECT 
  s.id,
  s.barcode,
  s.full_name,
  s.phone,
  s.parent_phone,
  s.platform_account_active,
  s.active,
  s.grade_id,
  g.name AS grade_name,
  s.group_id,
  gr.name AS group_name
FROM students s
LEFT JOIN grades g ON s.grade_id = g.id AND g.deleted = 0
LEFT JOIN groups gr ON s.group_id = gr.id AND gr.deleted = 0
WHERE s.barcode = $1 AND s.deleted = 0
`;

const getStudentById = `
SELECT 
  s.id,
  s.barcode,
  s.full_name,
  s.phone,
  s.parent_phone,
  s.platform_account_active,
  s.active,
  s.notes,
  s.grade_id,
  g.name AS grade_name,
  s.group_id,
  gr.name AS group_name
FROM students s
LEFT JOIN grades g ON s.grade_id = g.id AND g.deleted = 0
LEFT JOIN groups gr ON s.group_id = gr.id AND gr.deleted = 0
WHERE s.id = $1 AND s.deleted = 0
`;

module.exports = {
  getStudentProfile,
  getStudentQuickStats,
  getAttendanceHistory,
  getMonthlyAttendanceStats,
  getConsecutiveAbsences,
  getPaymentHistory,
  getRemainingBalance,
  getCurrentSubscription,
  getStudentPaperExams,
  getStudentExamResults,
  getAvailableOnlineExams,
  getStudentOnlineExams,
  getStudentExamAnswers,
  getStudentAssignments,
  getStudentSubmissions,
  getStudentPlaylists,
  getPlaylistVideos,
  getAllStudents,
  getStudentByBarcode,
  getStudentById,
};
