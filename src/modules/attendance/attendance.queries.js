/* ============================================
   ATTENDANCE QUERIES
   ============================================ */

// Create or update attendance record (Upsert)
const createAttendance = `
INSERT INTO attendance (student_id, group_id, grade_id, attendance_date, status, attendance_time, method, is_makeup, makeup_group_id, notes)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
ON CONFLICT (student_id, attendance_date) 
DO UPDATE SET 
  group_id = EXCLUDED.group_id,
  grade_id = EXCLUDED.grade_id,
  status = EXCLUDED.status,
  attendance_time = EXCLUDED.attendance_time,
  method = EXCLUDED.method,
  is_makeup = EXCLUDED.is_makeup,
  makeup_group_id = EXCLUDED.makeup_group_id,
  notes = EXCLUDED.notes
RETURNING *
`;

// Get attendance by group and date - 20 per page
const getAttendanceByGroupAndDate = `
SELECT 
  a.id,
  a.student_id,
  s.full_name,
  s.barcode,
  a.status,
  a.attendance_time,
  a.method,
  a.is_makeup,
  a.makeup_group_id,
  a.notes
FROM attendance a
JOIN students s ON a.student_id = s.id AND s.deleted = 0
WHERE a.group_id = $1 AND a.attendance_date = $2
ORDER BY s.full_name ASC
`;

// Get attendance by group and month - 20 per page
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
ORDER BY a.attendance_date DESC, s.full_name ASC
LIMIT 20 OFFSET (($3::int - 1) * 20)
`;

// Get attendance summary for a group on a date
const getAttendanceSummary = `
SELECT 
  (SELECT COUNT(*) FROM students WHERE group_id = $1 AND deleted = 0) AS total_students,
  (SELECT COUNT(*) FROM attendance WHERE group_id = $1 AND attendance_date = $2 AND status = 'present') AS present_count,
  (SELECT COUNT(*) FROM attendance WHERE group_id = $1 AND attendance_date = $2 AND status = 'absent') AS absent_count,
  (SELECT COUNT(*) FROM students s 
   WHERE s.group_id = $1 AND s.deleted = 0 
     AND NOT EXISTS (
       SELECT 1 FROM attendance a 
       WHERE a.student_id = s.id AND a.attendance_date = $2
     )) AS not_marked_count,
  $2::date AS attendance_date
`;

// Mark all unmarked students as absent for a group on a date
const markRestAbsent = `
INSERT INTO attendance (student_id, group_id, grade_id, attendance_date, status, method)
SELECT 
  s.id,
  s.group_id,
  s.grade_id,
  $2::date,
  'absent',
  'manual'
FROM students s
WHERE s.group_id = $1 
  AND s.deleted = 0
  AND NOT EXISTS (
    SELECT 1 FROM attendance a
    WHERE a.student_id = s.id AND a.attendance_date = $2::date
  )
RETURNING *
`;

// Get grade attendance stats
const getGradeAttendanceStats = `
SELECT 
  TO_CHAR(a.attendance_date, 'YYYY-MM') AS month,
  COUNT(DISTINCT a.attendance_date) AS total_days,
  COUNT(a.id) AS total_records,
  COUNT(CASE WHEN a.status = 'present' THEN 1 END) AS present_count,
  COUNT(CASE WHEN a.status = 'absent' THEN 1 END) AS absent_count,
  ROUND(
    (COUNT(CASE WHEN a.status = 'present' THEN 1 END)::numeric / 
    NULLIF(COUNT(a.id), 0)) * 100, 2
  ) AS attendance_percentage
FROM attendance a
JOIN students s ON a.student_id = s.id AND s.deleted = 0
WHERE s.grade_id = $1
GROUP BY TO_CHAR(a.attendance_date, 'YYYY-MM')
ORDER BY month DESC
`;

// Get overall attendance stats
const getOverallAttendanceStats = `
SELECT 
  TO_CHAR(a.attendance_date, 'YYYY-MM') AS month,
  COUNT(DISTINCT a.attendance_date) AS total_days,
  COUNT(a.id) AS total_records,
  COUNT(CASE WHEN a.status = 'present' THEN 1 END) AS present_count,
  COUNT(CASE WHEN a.status = 'absent' THEN 1 END) AS absent_count,
  ROUND(
    (COUNT(CASE WHEN a.status = 'present' THEN 1 END)::numeric / 
    NULLIF(COUNT(a.id), 0)) * 100, 2
  ) AS attendance_percentage
FROM attendance a
GROUP BY TO_CHAR(a.attendance_date, 'YYYY-MM')
ORDER BY month DESC
`;

// Get students with 3+ consecutive absences
const getStudentsWithThreeConsecutiveAbsences = `
WITH ranked_attendance AS (
  SELECT 
    a.student_id,
    a.attendance_date,
    a.status,
    SUM(CASE WHEN a.status != 'absent' THEN 1 ELSE 0 END) 
      OVER (PARTITION BY a.student_id ORDER BY a.attendance_date DESC) AS group_id
  FROM attendance a
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
JOIN students s ON abs.student_id = s.id AND s.deleted = 0
LEFT JOIN grades g ON s.grade_id = g.id
LEFT JOIN groups gr ON s.group_id = gr.id
WHERE abs.consecutive_absences >= 3
ORDER BY abs.consecutive_absences DESC
`;

// Get attendance by ID
const getAttendanceById = `
SELECT 
  a.id,
  a.student_id,
  s.full_name,
  a.group_id,
  gr.name AS group_name,
  a.grade_id,
  a.attendance_date,
  a.status,
  a.attendance_time,
  a.method,
  a.is_makeup,
  a.makeup_group_id,
  a.notes
FROM attendance a
JOIN students s ON a.student_id = s.id
LEFT JOIN groups gr ON a.group_id = gr.id
WHERE a.id = $1
`;

// Update attendance record
const updateAttendance = `
UPDATE attendance
SET 
  status = $1,
  attendance_time = $2,
  method = $3,
  is_makeup = $4,
  makeup_group_id = $5,
  notes = $6
WHERE id = $7
RETURNING *
`;

// Delete attendance record
const deleteAttendance = `
DELETE FROM attendance
WHERE id = $1
RETURNING *
`;

// Get today's attendance summary for dashboard
const getDashboard = `
SELECT 
  (SELECT COUNT(*) FROM students WHERE deleted = 0) AS total_students,
  (SELECT COUNT(*) FROM attendance WHERE attendance_date = CURRENT_DATE AND status = 'present') AS present_today,
  (SELECT COUNT(*) FROM attendance WHERE attendance_date = CURRENT_DATE AND status = 'absent') AS absent_today,
  (SELECT COUNT(*) FROM students s 
   WHERE s.deleted = 0 
     AND NOT EXISTS (
       SELECT 1 FROM attendance a 
       WHERE a.student_id = s.id AND a.attendance_date = CURRENT_DATE
     )) AS not_marked_today
`;

module.exports = {
  createAttendance,
  getAttendanceByGroupAndDate,
  getAttendanceByGroupAndMonth,
  getAttendanceSummary,
  markRestAbsent,
  getGradeAttendanceStats,
  getOverallAttendanceStats,
  getStudentsWithThreeConsecutiveAbsences,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
  getDashboard,
};
