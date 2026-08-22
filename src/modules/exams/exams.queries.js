const getAllExams = `
SELECT 
  e.id,
  e.title,
  e.grade_id,
  g.name AS grade_name,
  e.group_id,
  gr.name AS group_name,
  e.total_degree,
  e.exam_date,
  e.notes,
  e.created_at
FROM exams e
LEFT JOIN grades g ON e.grade_id = g.id AND g.deleted = 0
LEFT JOIN groups gr ON e.group_id = gr.id 
ORDER BY e.exam_date DESC
`;

const getExamById = `
SELECT 
  e.id,
  e.title,
  e.grade_id,
  g.name AS grade_name,
  e.group_id,
  gr.name AS group_name,
  e.total_degree,
  e.exam_date,
  e.notes,
  e.created_at
FROM exams e
LEFT JOIN grades g ON e.grade_id = g.id AND g.deleted = 0
LEFT JOIN groups gr ON e.group_id = gr.id 
WHERE e.id = $1 AND e.deleted = 0
`;

const getExamsByGradeId = `
SELECT 
  e.id,
  e.title,
  e.grade_id,
  g.name AS grade_name,
  e.group_id,
  gr.name AS group_name,
  e.total_degree,
  e.exam_date,
  e.notes,
  e.created_at
FROM exams e
LEFT JOIN grades g ON e.grade_id = g.id AND g.deleted = 0
LEFT JOIN groups gr ON e.group_id = gr.id 
WHERE e.grade_id = $1 AND e.deleted = 0
ORDER BY e.exam_date DESC
`;

const getExamsByGroupId = `
SELECT 
  e.id,
  e.title,
  e.grade_id,
  g.name AS grade_name,
  e.group_id,
  gr.name AS group_name,
  e.total_degree,
  e.exam_date,
  e.notes,
  e.created_at
FROM exams e
LEFT JOIN grades g ON e.grade_id = g.id AND g.deleted = 0
LEFT JOIN groups gr ON e.group_id = gr.id
WHERE e.group_id = $1 AND e.deleted = 0
ORDER BY e.exam_date DESC
`;

const getExamStats = `
SELECT 
  e.id,
  e.title,
  e.total_degree,
  COUNT(er.id) AS students_count,
  ROUND(AVG(er.degree)::numeric, 2) AS average_degree,
  MAX(er.degree) AS highest_degree,
  MIN(er.degree) AS lowest_degree
FROM exams e
LEFT JOIN exam_results er ON e.id = er.exam_id AND er.deleted = 0
WHERE e.id = $1 AND e.deleted = 0
GROUP BY e.id, e.title, e.total_degree
`;

const getGradeExamStats = `
SELECT 
  g.id,
  g.name,
  COUNT(DISTINCT e.id) AS total_exams,
  ROUND(AVG(er.degree)::numeric, 2) AS overall_average,
  MAX(er.degree) AS highest_degree,
  MIN(er.degree) AS lowest_degree
FROM grades g
LEFT JOIN exams e ON g.id = e.grade_id AND e.deleted = 0
LEFT JOIN exam_results er ON e.id = er.exam_id AND er.deleted = 0
WHERE g.id = $1 AND g.deleted = 0
GROUP BY g.id, g.name
`;

module.exports = {
  getAllExams,
  getExamById,
  getExamsByGradeId,
  getExamsByGroupId,
  getExamStats,
  getGradeExamStats
};