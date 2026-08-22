const getAllAssignments = `
SELECT 
  a.id,
  a.title,
  a.description,
  a.grade_id,
  g.name AS grade_name,
  a.group_id,
  gr.name AS group_name,
  a.file_path,
  a.full_mark,
  a.deadline,
  a.is_closed,
  a.created_by,
  a.created_at
FROM assignments a
LEFT JOIN grades g ON a.grade_id = g.id AND g.deleted = 0
LEFT JOIN groups gr ON a.group_id = gr.id
WHERE a.deleted = 0
ORDER BY a.deadline DESC
`;

const getAssignmentById = `
SELECT 
  a.id,
  a.title,
  a.description,
  a.grade_id,
  g.name AS grade_name,
  a.group_id,
  gr.name AS group_name,
  a.file_path,
  a.full_mark,
  a.deadline,
  a.is_closed,
  a.created_by,
  a.created_at
FROM assignments a
LEFT JOIN grades g ON a.grade_id = g.id AND g.deleted = 0
LEFT JOIN groups gr ON a.group_id = gr.id
WHERE a.id = $1 AND a.deleted = 0
`;

const getAssignmentsByGradeId = `
SELECT 
  a.id,
  a.title,
  a.description,
  a.grade_id,
  g.name AS grade_name,
  a.group_id,
  gr.name AS group_name,
  a.file_path,
  a.full_mark,
  a.deadline,
  a.is_closed,
  a.created_by,
  a.created_at
FROM assignments a
LEFT JOIN grades g ON a.grade_id = g.id AND g.deleted = 0
LEFT JOIN groups gr ON a.group_id = gr.id
WHERE a.grade_id = $1 AND a.deleted = 0
ORDER BY a.deadline DESC
`;

const getAssignmentsByGroupId = `
SELECT 
  a.id,
  a.title,
  a.description,
  a.grade_id,
  g.name AS grade_name,
  a.group_id,
  gr.name AS group_name,
  a.file_path,
  a.full_mark,
  a.deadline,
  a.is_closed,
  a.created_by,
  a.created_at
FROM assignments a
LEFT JOIN grades g ON a.grade_id = g.id AND g.deleted = 0
LEFT JOIN groups gr ON a.group_id = gr.id
WHERE a.group_id = $1 AND a.deleted = 0
ORDER BY a.deadline DESC
`;

const createAssignment = `
INSERT INTO assignments (title, description, grade_id, group_id, file_path, full_mark, deadline, created_by)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *
`;

const updateAssignment = `
UPDATE assignments
SET 
  title = $2,
  description = $3,
  grade_id = $4,
  group_id = $5,
  file_path = $6,
  full_mark = $7,
  deadline = $8,
  is_closed = $9
WHERE id = $1
RETURNING *
`;

const deleteAssignment = `
UPDATE assignments
SET deleted = 1
WHERE id = $1
RETURNING id
`;

module.exports = {
  getAllAssignments,
  getAssignmentById,
  getAssignmentsByGradeId,
  getAssignmentsByGroupId,
  createAssignment,
  updateAssignment,
  deleteAssignment
};