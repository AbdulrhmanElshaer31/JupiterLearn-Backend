const getAllGroups = `
SELECT 
  id,
  name,
  grade_id,
  day,
  days,
  start_time,
  end_time,
  room,
  lock_attendance_after_minutes,
  created_at,
  updated_at
FROM groups
WHERE deleted = 0
ORDER BY name ASC
`;

const getGroupById = `
SELECT 
  id,
  name,
  grade_id,
  day,
  days,
  start_time,
  end_time,
  room,
  lock_attendance_after_minutes,
  created_at,
  updated_at
FROM groups
WHERE id = $1 AND deleted = 0
`;

const getGroupsByGradeId = `
SELECT 
  id,
  name,
  grade_id,
  day,
  days,
  start_time,
  end_time,
  room,
  lock_attendance_after_minutes,
  created_at,
  updated_at
FROM groups
WHERE grade_id = $1 AND deleted = 0
ORDER BY name ASC
`;

const getGroupStats = `
SELECT 
  gr.id,
  gr.name,
  gr.grade_id,
  g.name AS grade_name,
  COUNT(DISTINCT s.id) AS total_students,
  COUNT(DISTINCT CASE WHEN s.active = 1 THEN s.id END) AS active_students,
  COUNT(DISTINCT CASE WHEN s.active = 0 THEN s.id END) AS inactive_students
FROM groups gr
LEFT JOIN grades g ON gr.grade_id = g.id AND g.deleted = 0
LEFT JOIN students s ON gr.id = s.group_id AND s.deleted = 0
WHERE gr.id = $1 AND gr.deleted = 0
GROUP BY gr.id, gr.name, gr.grade_id, g.name
`;

const getAllGroupsStats = `
SELECT 
  gr.id,
  gr.name,
  gr.grade_id,
  g.name AS grade_name,
  COUNT(DISTINCT s.id) AS total_students,
  COUNT(DISTINCT CASE WHEN s.active = 1 THEN s.id END) AS active_students,
  COUNT(DISTINCT CASE WHEN s.active = 0 THEN s.id END) AS inactive_students
FROM groups gr
LEFT JOIN grades g ON gr.grade_id = g.id AND g.deleted = 0
LEFT JOIN students s ON gr.id = s.group_id AND s.deleted = 0
WHERE gr.deleted = 0
GROUP BY gr.id, gr.name, gr.grade_id, g.name
ORDER BY gr.name ASC
`;

module.exports = {
  getAllGroups,
  getGroupById,
  getGroupsByGradeId,
  getGroupStats,
  getAllGroupsStats
};