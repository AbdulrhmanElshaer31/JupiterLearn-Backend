const playlistService = require("./playlists.service");

const getAllPlaylists = async (req, res, next) => {
  try {
    const playlists = await playlistService.getAllPlaylists();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: playlists,
    });
  } catch (error) {
    next(error);
  }
};

const getPlaylistById = async (req, res, next) => {
  try {
    const playlist = await playlistService.getPlaylistById(req.params.playlistId);
    if (!playlist) throw new Error("Playlist Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: playlist,
    });
  } catch (error) {
    next(error);
  }
};

const getPlaylistsByGradeId = async (req, res, next) => {
  try {
    const playlists = await playlistService.getPlaylistsByGradeId(req.params.gradeId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: playlists,
    });
  } catch (error) {
    next(error);
  }
};

const getActivePlaylists = async (req, res, next) => {
  try {
    const playlists = await playlistService.getActivePlaylists();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: playlists,
    });
  } catch (error) {
    next(error);
  }
};

const getInactivePlaylists = async (req, res, next) => {
  try {
    const playlists = await playlistService.getInactivePlaylists();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: playlists,
    });
  } catch (error) {
    next(error);
  }
};

const createPlaylist = async (req, res, next) => {
  try {
    const { title, description, gradeId } = req.body;
    const playlist = await playlistService.createPlaylist(title, description, gradeId, req.userId);
    return res.status(201).json({
      success: true,
      message: "Playlist Created!",
      data: playlist,
    });
  } catch (error) {
    next(error);
  }
};

const updatePlaylist = async (req, res, next) => {
  try {
    const { title, description, gradeId, isActive } = req.body;
    const playlist = await playlistService.updatePlaylist(req.params.playlistId, title, description, gradeId, isActive);
    if (!playlist) throw new Error("Playlist Not Found!");
    return res.status(200).json({
      success: true,
      message: "Playlist Updated!",
      data: playlist,
    });
  } catch (error) {
    next(error);
  }
};

const deletePlaylist = async (req, res, next) => {
  try {
    const playlist = await playlistService.deletePlaylist(req.params.playlistId);
    if (!playlist) throw new Error("Playlist Not Found!");
    return res.status(200).json({
      success: true,
      message: "Playlist Deleted!",
      data: playlist,
    });
  } catch (error) {
    next(error);
  }
};

const getPlaylistStats = async (req, res, next) => {
  try {
    const stats = await playlistService.getPlaylistStats(req.params.playlistId);
    if (!stats) throw new Error("Playlist Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

const getGradePlaylistsStats = async (req, res, next) => {
  try {
    const stats = await playlistService.getGradePlaylistsStats(req.params.gradeId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
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