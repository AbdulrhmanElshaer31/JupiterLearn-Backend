const getAllGrades = `
SELECT 
  id,
  name,
  monthly_price,
  platform_enabled,
  whatsapp_group_link,
created_at,
updated_at
FROM grades
WHERE deleted = 0
ORDER BY name ASC
`;

const getGradeById = `
SELECT 
  id,
  name,
  monthly_price,
  platform_enabled,
  whatsapp_group_link,
  created_at,
  updated_at
FROM grades
WHERE id = $1 AND deleted = 0
`;

const getActiveGrades = `
SELECT 
  id,
  name,
  monthly_price,
  platform_enabled,
  whatsapp_group_link,
  created_at,
  updated_at
FROM grades
WHERE deleted = 0 AND platform_enabled = 1
ORDER BY name ASC
`;

const getInactiveGrades = `
SELECT 
  id,
  name,
  monthly_price,
  platform_enabled,
  whatsapp_group_link,
  created_at,
  updated_at
FROM grades
WHERE deleted = 0 AND platform_enabled = 0
ORDER BY name ASC
`;

const getGradeStats = `
SELECT 
  g.id,
  g.name,
  g.platform_enabled,
  COUNT(DISTINCT s.id) AS total_students,
  COUNT(DISTINCT CASE WHEN s.active = 1 THEN s.id END) AS active_students,
  COUNT(DISTINCT CASE WHEN s.active = 0 THEN s.id END) AS inactive_students
FROM grades g
LEFT JOIN students s ON g.id = s.grade_id AND s.deleted = 0
WHERE g.id = $1 AND g.deleted = 0
GROUP BY g.id, g.name, g.platform_enabled
`;

const getAllGradesStats = `
SELECT 
  g.id,
  g.name,
  g.platform_enabled,
  COUNT(DISTINCT s.id) AS total_students,
  COUNT(DISTINCT CASE WHEN s.active = 1 THEN s.id END) AS active_students,
  COUNT(DISTINCT CASE WHEN s.active = 0 THEN s.id END) AS inactive_students
FROM grades g
LEFT JOIN students s ON g.id = s.grade_id AND s.deleted = 0
WHERE g.deleted = 0
GROUP BY g.id, g.name, g.platform_enabled
ORDER BY g.name ASC
`;

module.exports = {
  getAllGrades,
  getGradeById,
  getActiveGrades,
  getInactiveGrades,
  getGradeStats,
  getAllGradesStats,
};
