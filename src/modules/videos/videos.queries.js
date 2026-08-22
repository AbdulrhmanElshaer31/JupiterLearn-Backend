const getAllVideos = `
SELECT 
  v.id,
  v.title,
  v.description,
  v.grade_id,
  g.name AS grade_name,
  v.youtube_url,
  v.is_active,
  v.created_by,
  v.created_at,
FROM videos v
LEFT JOIN grades g ON v.grade_id = g.id AND g.deleted = 0
ORDER BY v.created_at DESC
`;

const getVideoById = `
SELECT 
  v.id,
  v.title,
  v.description,
  v.grade_id,
  g.name AS grade_name,
  v.youtube_url,
  v.is_active,
  v.created_by,
  v.created_at,
FROM videos v
LEFT JOIN grades g ON v.grade_id = g.id AND g.deleted = 0
WHERE v.id = $1
`;

const getVideosByGradeId = `
SELECT 
  v.id,
  v.title,
  v.description,
  v.grade_id,
  g.name AS grade_name,
  v.youtube_url,
  v.is_active,
  v.created_by,
  v.created_at,
FROM videos v
LEFT JOIN grades g ON v.grade_id = g.id AND g.deleted = 0
WHERE v.grade_id = $1
ORDER BY v.created_at DESC
`;

const getActiveVideos = `
SELECT 
  v.id,
  v.title,
  v.description,
  v.grade_id,
  g.name AS grade_name,
  v.youtube_url,
  v.is_active,
  v.created_by,
  v.created_at,
FROM videos v
LEFT JOIN grades g ON v.grade_id = g.id AND g.deleted = 0
WHERE v.is_active = 1
ORDER BY v.created_at DESC
`;

const getInactiveVideos = `
SELECT 
  v.id,
  v.title,
  v.description,
  v.grade_id,
  g.name AS grade_name,
  v.youtube_url,
  v.is_active,
  v.created_by,
  v.created_at,
FROM videos v
LEFT JOIN grades g ON v.grade_id = g.id AND g.deleted = 0
WHERE v.is_active = 0
ORDER BY v.created_at DESC
`;

const createVideo = `
INSERT INTO videos (title, description, grade_id, youtube_url, created_by)
VALUES ($1, $2, $3, $4, $5)
RETURNING *
`;

const updateVideo = `
UPDATE videos
SET 
  title = $2,
  description = $3,
  grade_id = $4,
  youtube_url = $5,
  is_active = $6,
  WHERE id = $1
RETURNING *
`;

const deleteVideo = `
UPDATE videos SET deleted = 1 WHERE id = $1 RETURNING id
`;

module.exports = {
  getAllVideos,
  getVideoById,
  getVideosByGradeId,
  getActiveVideos,
  getInactiveVideos,
  createVideo,
  updateVideo,
  deleteVideo
};