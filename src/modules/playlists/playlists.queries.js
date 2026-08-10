const getAllPlaylists = `
SELECT 
  p.id,
  p.title,
  p.description,
  p.grade_id,
  g.name AS grade_name,
  p.is_active,
  p.created_by,
  p.created_at,
  p.updated_at
FROM playlists p
LEFT JOIN grades g ON p.grade_id = g.id AND g.deleted = 0
ORDER BY p.created_at DESC
`;

const getPlaylistById = `
SELECT 
  p.id,
  p.title,
  p.description,
  p.grade_id,
  g.name AS grade_name,
  p.is_active,
  p.created_by,
  p.created_at,
  p.updated_at
FROM playlists p
LEFT JOIN grades g ON p.grade_id = g.id AND g.deleted = 0
WHERE p.id = $1
`;

const getPlaylistsByGradeId = `
SELECT 
  p.id,
  p.title,
  p.description,
  p.grade_id,
  g.name AS grade_name,
  p.is_active,
  p.created_by,
  p.created_at,
  p.updated_at
FROM playlists p
LEFT JOIN grades g ON p.grade_id = g.id AND g.deleted = 0
WHERE p.grade_id = $1
ORDER BY p.created_at DESC
`;

const getActivePlaylists = `
SELECT 
  p.id,
  p.title,
  p.description,
  p.grade_id,
  g.name AS grade_name,
  p.is_active,
  p.created_by,
  p.created_at,
  p.updated_at
FROM playlists p
LEFT JOIN grades g ON p.grade_id = g.id AND g.deleted = 0
WHERE p.is_active = 1
ORDER BY p.created_at DESC
`;

const getInactivePlaylists = `
SELECT 
  p.id,
  p.title,
  p.description,
  p.grade_id,
  g.name AS grade_name,
  p.is_active,
  p.created_by,
  p.created_at,
  p.updated_at
FROM playlists p
LEFT JOIN grades g ON p.grade_id = g.id AND g.deleted = 0
WHERE p.is_active = 0
ORDER BY p.created_at DESC
`;

const createPlaylist = `
INSERT INTO playlists (title, description, grade_id, created_by)
VALUES ($1, $2, $3, $4)
RETURNING *
`;

const updatePlaylist = `
UPDATE playlists
SET 
  title = $2,
  description = $3,
  grade_id = $4,
  is_active = $5,
  updated_at = NOW()
WHERE id = $1
RETURNING *
`;

const deletePlaylist = `
DELETE FROM playlists
WHERE id = $1
RETURNING id
`;

const getPlaylistStats = `
SELECT 
  p.id,
  p.title,
  COUNT(pv.video_id) AS videos_count
FROM playlists p
LEFT JOIN playlist_videos pv ON p.id = pv.playlist_id
WHERE p.id = $1
GROUP BY p.id, p.title
`;

const getGradePlaylistsStats = `
SELECT 
  p.id,
  p.title,
  COUNT(pv.video_id) AS videos_count
FROM playlists p
LEFT JOIN playlist_videos pv ON p.id = pv.playlist_id
WHERE p.grade_id = $1
GROUP BY p.id, p.title
ORDER BY p.title ASC
`;

module.exports = {
  getAllPlaylists,
  getPlaylistById,
  getPlaylistsByGradeId,
  getActivePlaylists,
  getInactivePlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  getPlaylistStats,
  getGradePlaylistsStats
};