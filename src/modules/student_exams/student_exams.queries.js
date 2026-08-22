const getStudentExamsByExamId = `
SELECT 
  se.id,
  se.student_id,
  s.full_name,
  s.barcode,
  se.score,
  se.total_questions,
  se.correct_answers,
  se.started_at,
  se.submitted_at
FROM student_exams se
JOIN students s ON se.student_id = s.id AND s.deleted = 0
WHERE se.exam_id = $1
ORDER BY se.score DESC
`;

const getExamAttemptStats = `
SELECT 
  oe.id,
  oe.title,
  oe.full_mark,
  oe.start_at,
  oe.end_at,
  COUNT(se.id) AS total_attempts,
  COUNT(DISTINCT se.student_id) AS students_attempted,
  (SELECT COUNT(*) FROM students WHERE grade_id = oe.grade_id AND deleted = 0 AND active = 1) AS total_students,
  ROUND(AVG(se.score)::numeric, 2) AS average_score,
  MAX(se.score) AS highest_score,
  MIN(se.score) AS lowest_score,
  ROUND(AVG(se.correct_answers)::numeric, 2) AS average_correct_answers
FROM online_exams oe
LEFT JOIN student_exams se ON oe.id = se.exam_id
WHERE oe.id = $1
GROUP BY oe.id, oe.title, oe.full_mark, oe.start_at, oe.end_at
`;

const getGradeExamAttemptsStats = `
SELECT 
  oe.id,
  oe.title,
  oe.full_mark,
  oe.start_at,
  oe.end_at,
  COUNT(se.id) AS total_attempts,
  COUNT(DISTINCT se.student_id) AS students_attempted,
  (SELECT COUNT(*) FROM students WHERE grade_id = oe.grade_id AND deleted = 0 AND active = 1) AS total_students,
  ROUND(AVG(se.score)::numeric, 2) AS average_score,
  MAX(se.score) AS highest_score,
  MIN(se.score) AS lowest_score
FROM online_exams oe
LEFT JOIN student_exams se ON oe.id = se.exam_id
WHERE oe.grade_id = $1
GROUP BY oe.id, oe.title, oe.full_mark, oe.start_at, oe.end_at
ORDER BY oe.title ASC
`;

const getGroupExamAttemptsStats = `
SELECT 
  oe.id,
  oe.title,
  oe.full_mark,
  oe.start_at,
  oe.end_at,
  COUNT(se.id) AS total_attempts,
  COUNT(DISTINCT se.student_id) AS students_attempted,
  (SELECT COUNT(*) FROM students WHERE group_id = oe.group_id AND deleted = 0 AND active = 1) AS total_students,
  ROUND(AVG(se.score)::numeric, 2) AS average_score,
  MAX(se.score) AS highest_score,
  MIN(se.score) AS lowest_score
FROM online_exams oe
LEFT JOIN student_exams se ON oe.id = se.exam_id
WHERE oe.group_id = $1
GROUP BY oe.id, oe.title, oe.full_mark, oe.start_at, oe.end_at
ORDER BY oe.title ASC
`;

module.exports = {
  getStudentExamsByExamId,
  getExamAttemptStats,
  getGradeExamAttemptsStats,
  getGroupExamAttemptsStats,
};