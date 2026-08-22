const getAllOnlineExams = `
SELECT 
  oe.id,
  oe.title,
  oe.description,
  oe.grade_id,
  g.name AS grade_name,
  oe.group_id,
  gr.name AS group_name,
  oe.duration_minutes,
  oe.start_at,
  oe.end_at,
  oe.full_mark,
  oe.randomize_questions,
  oe.created_by,
  oe.created_at,
FROM online_exams oe
LEFT JOIN grades g ON oe.grade_id = g.id AND g.deleted = 0
LEFT JOIN groups gr ON oe.group_id = gr.id 
ORDER BY oe.created_at DESC
`;

const getOnlineExamById = `
SELECT 
  oe.id,
  oe.title,
  oe.description,
  oe.grade_id,
  g.name AS grade_name,
  oe.group_id,
  gr.name AS group_name,
  oe.duration_minutes,
  oe.start_at,
  oe.end_at,
  oe.full_mark,
  oe.randomize_questions,
  oe.created_by,
  oe.created_at,
FROM online_exams oe
LEFT JOIN grades g ON oe.grade_id = g.id AND g.deleted = 0
LEFT JOIN groups gr ON oe.group_id = gr.id
`;

const getOnlineExamsByGradeId = `
SELECT 
  oe.id,
  oe.title,
  oe.description,
  oe.grade_id,
  g.name AS grade_name,
  oe.group_id,
  gr.name AS group_name,
  oe.duration_minutes,
  oe.start_at,
  oe.end_at,
  oe.full_mark,
  oe.randomize_questions,
  oe.created_by,
  oe.created_at,
FROM online_exams oe
LEFT JOIN grades g ON oe.grade_id = g.id AND g.deleted = 0
LEFT JOIN groups gr ON oe.group_id = gr.id
WHERE oe.grade_id = $1
ORDER BY oe.created_at DESC
`;

const getOnlineExamsByGroupId = `
SELECT 
  oe.id,
  oe.title,
  oe.description,
  oe.grade_id,
  g.name AS grade_name,
  oe.group_id,
  gr.name AS group_name,
  oe.duration_minutes,
  oe.start_at,
  oe.end_at,
  oe.full_mark,
  oe.randomize_questions,
  oe.created_by,
  oe.created_at,
FROM online_exams oe
LEFT JOIN grades g ON oe.grade_id = g.id AND g.deleted = 0
LEFT JOIN groups gr ON oe.group_id = gr.id 
WHERE oe.group_id = $1
ORDER BY oe.created_at DESC
`;

const getOnlineExamStats = `
SELECT 
  oe.id,
  oe.title,
  oe.full_mark,
  oe.start_at,
  oe.end_at,
  COUNT(q.id) AS questions_count,
  COUNT(DISTINCT se.id) AS students_attempted,
  (SELECT COUNT(*) FROM students WHERE grade_id = oe.grade_id AND deleted = 0 AND active = 1) AS total_students,
  ROUND(AVG(se.score)::numeric, 2) AS average_score,
  MAX(se.score) AS highest_score,
  MIN(se.score) AS lowest_score,
  COUNT(CASE WHEN se.score >= (oe.full_mark * 0.5) THEN 1 END) AS passed_count,
  COUNT(CASE WHEN se.score < (oe.full_mark * 0.5) THEN 1 END) AS failed_count
FROM online_exams oe
LEFT JOIN questions q ON oe.id = q.exam_id
LEFT JOIN student_exams se ON oe.id = se.exam_id AND se.submitted_at IS NOT NULL
WHERE oe.id = $1
GROUP BY oe.id, oe.title, oe.full_mark, oe.start_at, oe.end_at
`;

const getGradeOnlineExamStats = `
SELECT 
  g.id,
  g.name,
  COUNT(DISTINCT oe.id) AS total_exams,
  COUNT(DISTINCT se.student_id) AS total_students_attempted,
  ROUND(AVG(se.score)::numeric, 2) AS overall_average
FROM grades g
LEFT JOIN online_exams oe ON g.id = oe.grade_id
LEFT JOIN student_exams se ON oe.id = se.exam_id AND se.submitted_at IS NOT NULL
WHERE g.id = $1 AND g.deleted = 0
GROUP BY g.id, g.name
`;

const createOnlineExam = `
INSERT INTO online_exams (title, description, grade_id, group_id, duration_minutes, start_at, end_at, full_mark, randomize_questions, created_by)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
RETURNING *
`;

const updateOnlineExam = `
UPDATE online_exams
SET 
  title = $2,
  description = $3,
  grade_id = $4,
  group_id = $5,
  duration_minutes = $6,
  start_at = $7,
  end_at = $8,
  full_mark = $9,
  randomize_questions = $10,
  updated_at = NOW()
WHERE id = $1
RETURNING *
`;

const deleteOnlineExam = `
UPDATE online_exams SET deleted = 1 WHERE id = $1 RETURNING id
`;

module.exports = {
  getAllOnlineExams,
  getOnlineExamById,
  getOnlineExamsByGradeId,
  getOnlineExamsByGroupId,
  getOnlineExamStats,
  getGradeOnlineExamStats,
  createOnlineExam,
  updateOnlineExam,
  deleteOnlineExam,
};
