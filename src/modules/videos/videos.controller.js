const videoService = require("./videos.service");

const getAllVideos = async (req, res, next) => {
  try {
    const videos = await videoService.getAllVideos();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: videos,
    });
  } catch (error) {
    next(error);
  }
};

const getVideoById = async (req, res, next) => {
  try {
    const video = await videoService.getVideoById(req.params.videoId);
    if (!video) throw new Error("Video Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: video,
    });
  } catch (error) {
    next(error);
  }
};

const getVideosByGradeId = async (req, res, next) => {
  try {
    const videos = await videoService.getVideosByGradeId(req.params.gradeId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: videos,
    });
  } catch (error) {
    next(error);
  }
};

const getActiveVideos = async (req, res, next) => {
  try {
    const videos = await videoService.getActiveVideos();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: videos,
    });
  } catch (error) {
    next(error);
  }
};

const getInactiveVideos = async (req, res, next) => {
  try {
    const videos = await videoService.getInactiveVideos();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: videos,
    });
  } catch (error) {
    next(error);
  }
};

const createVideo = async (req, res, next) => {
  try {
    const { title, description, gradeId, youtubeUrl } = req.body;
    const video = await videoService.createVideo(title, description, gradeId, youtubeUrl, req.userId);
    return res.status(201).json({
      success: true,
      message: "Video Created!",
      data: video,
    });
  } catch (error) {
    next(error);
  }
};

const updateVideo = async (req, res, next) => {
  try {
    const { title, description, gradeId, youtubeUrl, isActive } = req.body;
    const video = await videoService.updateVideo(req.params.videoId, title, description, gradeId, youtubeUrl, isActive);
    if (!video) throw new Error("Video Not Found!");
    return res.status(200).json({
      success: true,
      message: "Video Updated!",
      data: video,
    });
  } catch (error) {
    next(error);
  }
};

const deleteVideo = async (req, res, next) => {
  try {
    const video = await videoService.deleteVideo(req.params.videoId);
    if (!video) throw new Error("Video Not Found!");
    return res.status(200).json({
      success: true,
      message: "Video Deleted!",
      data: video,
    });
  } catch (error) {
    next(error);
  }
};

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