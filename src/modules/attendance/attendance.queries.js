const getAttendanceByGroupAndDate = `
SELECT 
  a.id,
  a.student_id,
  s.full_name,
  a.status,
  a.attendance_time,
  a.method,
  a.is_makeup,
  a.notes
FROM attendance a
JOIN students s ON a.student_id = s.id AND s.deleted = 0
WHERE a.group_id = $1 AND a.attendance_date = $2 AND a.deleted = 0
ORDER BY s.full_name ASC
`;

const getAttendanceByGroupAndMonth = `
SELECT 
  a.id,
  a.student_id,
  s.full_name,
  a.attendance_date,
  a.status,
  a.attendance_time,
  a.method,
  a.is_makeup
FROM attendance a
JOIN students s ON a.student_id = s.id AND s.deleted = 0
WHERE a.group_id = $1 
  AND TO_CHAR(a.attendance_date, 'YYYY-MM') = $2
  AND a.deleted = 0
ORDER BY a.attendance_date DESC, s.full_name ASC
`;

const getGradeAttendanceStats = `
SELECT 
  TO_CHAR(a.attendance_date, 'YYYY-MM') AS month,
  COUNT(DISTINCT a.attendance_date) AS total_days,
  COUNT(a.id) AS total_records,
  COUNT(CASE WHEN a.status = 'present' THEN 1 END) AS present_count,
  COUNT(CASE WHEN a.status = 'absent' THEN 1 END) AS absent_count,
  COUNT(CASE WHEN a.status = 'late' THEN 1 END) AS late_count,
  ROUND(
    (COUNT(CASE WHEN a.status = 'present' THEN 1 END)::numeric / 
    NULLIF(COUNT(a.id), 0)) * 100, 2
  ) AS attendance_percentage
FROM attendance a
JOIN students s ON a.student_id = s.id AND s.deleted = 0
WHERE s.grade_id = $1 AND a.deleted = 0
GROUP BY TO_CHAR(a.attendance_date, 'YYYY-MM')
ORDER BY month DESC
`;

const getOverallAttendanceStats = `
SELECT 
  TO_CHAR(a.attendance_date, 'YYYY-MM') AS month,
  COUNT(DISTINCT a.attendance_date) AS total_days,
  COUNT(a.id) AS total_records,
  COUNT(CASE WHEN a.status = 'present' THEN 1 END) AS present_count,
  COUNT(CASE WHEN a.status = 'absent' THEN 1 END) AS absent_count,
  COUNT(CASE WHEN a.status = 'late' THEN 1 END) AS late_count,
  ROUND(
    (COUNT(CASE WHEN a.status = 'present' THEN 1 END)::numeric / 
    NULLIF(COUNT(a.id), 0)) * 100, 2
  ) AS attendance_percentage
FROM attendance a
WHERE a.deleted = 0
GROUP BY TO_CHAR(a.attendance_date, 'YYYY-MM')
ORDER BY month DESC
`;

const getStudentsWithThreeConsecutiveAbsences = `
WITH ranked_attendance AS (
  SELECT 
    a.student_id,
    a.attendance_date,
    a.status,
    ROW_NUMBER() OVER (PARTITION BY a.student_id ORDER BY a.attendance_date DESC) as rn,
    SUM(CASE WHEN a.status != 'absent' THEN 1 ELSE 0 END) 
      OVER (PARTITION BY a.student_id ORDER BY a.attendance_date DESC) AS group_id
  FROM attendance a
  WHERE a.deleted = 0
),
absent_streaks AS (
  SELECT 
    student_id,
    COUNT(*) as consecutive_absences
  FROM ranked_attendance
  WHERE status = 'absent' AND group_id = 0
  GROUP BY student_id
)
SELECT 
  s.id,
  s.full_name,
  s.barcode,
  s.parent_phone,
  g.name AS grade_name,
  gr.name AS group_name,
  abs.consecutive_absences
FROM absent_streaks abs
JOIN students s ON abs.student_id = s.id AND s.deleted = 0 AND s.active = 1
LEFT JOIN grades g ON s.grade_id = g.id
LEFT JOIN groups gr ON s.group_id = gr.id
WHERE abs.consecutive_absences >= 3
ORDER BY abs.consecutive_absences DESC
`;

module.exports = {
  getAttendanceByGroupAndDate,
  getAttendanceByGroupAndMonth,
  getGradeAttendanceStats,
  getOverallAttendanceStats,
  getStudentsWithThreeConsecutiveAbsences
};