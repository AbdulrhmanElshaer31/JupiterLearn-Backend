const { query } = require("../../config/database");
const playlistVideoQueries = require("./playlist_videos.queries");

const getPlaylistVideos = async (playlistId) => {
  const result = await query(playlistVideoQueries.getPlaylistVideos, [playlistId]);
  return result.rows;
};

const addVideoToPlaylist = async (playlistId, videoId) => {
  const result = await query(playlistVideoQueries.addVideoToPlaylist, [playlistId, videoId]);
  return result.rows[0];
};

const removeVideoFromPlaylist = async (id) => {
  const result = await query(playlistVideoQueries.removeVideoFromPlaylist, [id]);
  return result.rows[0];
};

module.exports = {
  getPlaylistVideos,
  addVideoToPlaylist,
  removeVideoFromPlaylist
};