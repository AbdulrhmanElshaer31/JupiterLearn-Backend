const playlistVideoService = require("./playlist_videos.service");

const getPlaylistVideos = async (req, res, next) => {
  try {
    const videos = await playlistVideoService.getPlaylistVideos(req.params.playlistId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: videos,
    });
  } catch (error) {
    next(error);
  }
};

const addVideoToPlaylist = async (req, res, next) => {
  try {
    const { playlistId, videoId } = req.body;
    const playlistVideo = await playlistVideoService.addVideoToPlaylist(playlistId, videoId);
    return res.status(201).json({
      success: true,
      message: "Video Added To Playlist!",
      data: playlistVideo,
    });
  } catch (error) {
    next(error);
  }
};

const removeVideoFromPlaylist = async (req, res, next) => {
  try {
    const playlistVideo = await playlistVideoService.removeVideoFromPlaylist(req.params.id);
    if (!playlistVideo) throw new Error("Not Found!");
    return res.status(200).json({
      success: true,
      message: "Video Removed From Playlist!",
      data: playlistVideo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPlaylistVideos,
  addVideoToPlaylist,
  removeVideoFromPlaylist
};