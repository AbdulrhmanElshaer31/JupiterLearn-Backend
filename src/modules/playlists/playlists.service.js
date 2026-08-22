const { query } = require("../../config/database");
const playlistQueries = require("./playlists.queries");

const getAllPlaylists = async () => {
  const result = await query(playlistQueries.getAllPlaylists);
  return result.rows;
};

const getPlaylistById = async (playlistId) => {
  const result = await query(playlistQueries.getPlaylistById, [playlistId]);
  return result.rows[0];
};

const getPlaylistsByGradeId = async (gradeId) => {
  const result = await query(playlistQueries.getPlaylistsByGradeId, [gradeId]);
  return result.rows;
};

const getActivePlaylists = async () => {
  const result = await query(playlistQueries.getActivePlaylists);
  return result.rows;
};

const getInactivePlaylists = async () => {
  const result = await query(playlistQueries.getInactivePlaylists);
  return result.rows;
};

const createPlaylist = async (title, description, gradeId, createdBy) => {
  const result = await query(playlistQueries.createPlaylist, [title, description, gradeId, createdBy]);
  return result.rows[0];
};


const updatePlaylist = async (playlistId, title, description, gradeId, isActive) => {
  const existing = await query("SELECT * FROM playlists WHERE id = $1", [playlistId]);
  if (!existing.rows[0]) return null;
  
 const updated = {
  title: title ?? existing.rows[0].title,
  description: description ?? existing.rows[0].description,
  grade_id: grade_id ?? existing.rows[0].grade_id,  // ✅
  is_active: isActive ?? existing.rows[0].is_active
};
  
  const result = await query(playlistQueries.updatePlaylist, [playlistId, updated.title, updated.description, updated.grade_id, updated.is_active]);
  return result.rows[0];
};

const deletePlaylist = async (playlistId) => {
  const result = await query(playlistQueries.deletePlaylist, [playlistId]);
  return result.rows[0];
};

const getPlaylistStats = async (playlistId) => {
  const result = await query(playlistQueries.getPlaylistStats, [playlistId]);
  return result.rows[0];
};

const getGradePlaylistsStats = async (gradeId) => {
  const result = await query(playlistQueries.getGradePlaylistsStats, [gradeId]);
  return result.rows;
};

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