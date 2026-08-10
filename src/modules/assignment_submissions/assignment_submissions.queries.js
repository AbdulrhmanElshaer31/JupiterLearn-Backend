const getSubmissionsByAssignmentId = `
SELECT 
  asub.id,
  asub.student_id,
  s.full_name,
  s.barcode,
  asub.file_path,
  asub.score,
  asub.feedback,
  asub.submitted_at,
  asub.reviewed_at,
  asub.reviewed_by
FROM assignment_submissions asub
JOIN students s ON asub.student_id = s.id AND s.deleted = 0
WHERE asub.assignment_id = $1
ORDER BY asub.submitted_at DESC
`;

const getStudentSubmission = `
SELECT 
  asub.id,
  asub.student_id,
  s.full_name,
  asub.file_path,
  asub.score,
  asub.feedback,
  asub.submitted_at,
  asub.reviewed_at,
  asub.reviewed_by
FROM assignment_submissions asub
JOIN students s ON asub.student_id = s.id AND s.deleted = 0
WHERE asub.assignment_id = $1 AND asub.student_id = $2
`;

const gradeSubmission = `
UPDATE assignment_submissions
SET 
  score = $2,
  feedback = $3,
  reviewed_by = $4,
  reviewed_at = NOW()
WHERE id = $1
RETURNING *
`;

const getAssignmentSubmissionStats = `
SELECT 
  a.id,
  a.title,
  a.full_mark,
  a.deadline,
  COUNT(asub.id) AS submitted_count,
  COUNT(DISTINCT s.id) AS total_students,
  COUNT(DISTINCT s.id) - COUNT(asub.id) AS not_submitted_count,
  ROUND(AVG(asub.score)::numeric, 2) AS average_score,
  MAX(asub.score) AS highest_score,
  MIN(asub.score) AS lowest_score
FROM assignments a
JOIN students s ON a.grade_id = s.grade_id AND s.deleted = 0 AND s.active = 1
LEFT JOIN assignment_submissions asub ON a.id = asub.assignment_id AND asub.student_id = s.id
WHERE a.id = $1
GROUP BY a.id, a.title, a.full_mark, a.deadline
`;

const getGradeAssignmentSubmissionStats = `
SELECT 
  a.id,
  a.title,
  a.full_mark,
  a.deadline,
  COUNT(asub.id) AS submitted_count,
  ROUND(AVG(asub.score)::numeric, 2) AS average_score
FROM assignments a
LEFT JOIN assignment_submissions asub ON a.id = asub.assignment_id
WHERE a.grade_id = $1
GROUP BY a.id, a.title, a.full_mark, a.deadline
ORDER BY a.deadline DESC
`;

const getGroupAssignmentSubmissionStats = `
SELECT 
  a.id,
  a.title,
  a.full_mark,
  a.deadline,
  COUNT(asub.id) AS submitted_count,
  ROUND(AVG(asub.score)::numeric, 2) AS average_score
FROM assignments a
LEFT JOIN assignment_submissions asub ON a.id = asub.assignment_id
WHERE a.group_id = $1
GROUP BY a.id, a.title, a.full_mark, a.deadline
ORDER BY a.deadline DESC
`;

module.exports = {
  getSubmissionsByAssignmentId,
  getStudentSubmission,
  gradeSubmission,
  getAssignmentSubmissionStats,
  getGradeAssignmentSubmissionStats,
  getGroupAssignmentSubmissionStats
};