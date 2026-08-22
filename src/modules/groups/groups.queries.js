// Create a new group
const createGroup = `
INSERT INTO groups (name, grade_id, days, start_time, end_time, room)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *
`;

// Get all groups that are not deleted
const getAllGroups = `
SELECT 
  id,
  name,
  grade_id,
  days,
  start_time,
  end_time,
  room,
  created_at,
  updated_at
FROM groups
WHERE deleted = 0
ORDER BY name ASC
`;

// Get a single group by its ID
const getGroupById = `
SELECT 
  id,
  name,
  grade_id,
  days,
  start_time,
  end_time,
  room,
  created_at,
  updated_at
FROM groups
WHERE id = $1 AND deleted = 0
`;

// Find groups by name within a specific grade
const findGroupByName = `
SELECT 
  id,
  name,
  grade_id,
  days,
  start_time,
  end_time,
  room,
  created_at,
  updated_at
FROM groups
WHERE name = $1 AND grade_id = $2 AND deleted = 0
`;

// Get all groups that belong to a specific grade
const getGroupsByGradeId = `
SELECT 
  id,
  name,
  grade_id,
  days,
  start_time,
  end_time,
  room,
  created_at,
  updated_at
FROM groups
WHERE grade_id = $1 AND deleted = 0
ORDER BY name ASC
`;

// Update a group's information
const updateGroup = `
UPDATE groups 
SET name = $1, days = $2, start_time = $3, end_time = $4, room = $5, updated_at = NOW()
WHERE id = $6 AND deleted = 0
RETURNING *
`;

// Soft delete a group (set deleted = 1)
const softDeleteGroup = `
UPDATE groups 
SET deleted = 1, updated_at = NOW()
WHERE id = $1 AND deleted = 0
RETURNING *
`;

// Hard delete a group permanently
const hardDeleteGroup = `
DELETE FROM groups 
WHERE id = $1
RETURNING *
`;

// Get statistics for a single group (total, active, deleted students)
const getGroupStats = `
SELECT 
  gr.id,
  gr.name,
  gr.grade_id,
  g.name AS grade_name,
  COUNT(DISTINCT s.id) AS total_students,
  COUNT(DISTINCT CASE WHEN s.deleted = 0 THEN s.id END) AS active_students,
  COUNT(DISTINCT CASE WHEN s.deleted = 1 THEN s.id END) AS deleted_students
FROM groups gr
LEFT JOIN grades g ON gr.grade_id = g.id AND g.deleted = 0
LEFT JOIN students s ON gr.id = s.group_id
WHERE gr.id = $1 AND gr.deleted = 0
GROUP BY gr.id, gr.name, gr.grade_id, g.name
`;

// Get statistics for all groups (total, active, deleted students)
const getAllGroupsStats = `
SELECT 
  gr.id,
  gr.name,
  gr.grade_id,
  g.name AS grade_name,
  COUNT(DISTINCT s.id) AS total_students,
  COUNT(DISTINCT CASE WHEN s.deleted = 0 THEN s.id END) AS active_students,
  COUNT(DISTINCT CASE WHEN s.deleted = 1 THEN s.id END) AS deleted_students
FROM groups gr
LEFT JOIN grades g ON gr.grade_id = g.id AND g.deleted = 0
LEFT JOIN students s ON gr.id = s.group_id
WHERE gr.deleted = 0
GROUP BY gr.id, gr.name, gr.grade_id, g.name
ORDER BY gr.name ASC
`;

// Get all groups with their students count
const getGroupsWithStudentsCount = `
SELECT 
  gr.id,
  gr.name,
  gr.grade_id,
  COUNT(s.id) AS students_count
FROM groups gr
LEFT JOIN students s ON gr.id = s.group_id AND s.deleted = 0
WHERE gr.deleted = 0
GROUP BY gr.id, gr.name, gr.grade_id
ORDER BY gr.name ASC
`;

// Get all groups with their grade name
const getGroupsWithGradeName = `
SELECT 
  gr.id,
  gr.name,
  gr.grade_id,
  g.name AS grade_name,
  gr.days,
  gr.start_time,
  gr.end_time,
  gr.room
FROM groups gr
LEFT JOIN grades g ON gr.grade_id = g.id AND g.deleted = 0
WHERE gr.deleted = 0
ORDER BY gr.name ASC
`;

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById,
  findGroupByName,
  getGroupsByGradeId,
  updateGroup,
  softDeleteGroup,
  hardDeleteGroup,
  getGroupStats,
  getAllGroupsStats,
  getGroupsWithStudentsCount,
  getGroupsWithGradeName,
};
