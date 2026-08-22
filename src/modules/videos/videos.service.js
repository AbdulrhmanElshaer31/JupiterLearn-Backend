const { query } = require("../../config/database");
const videoQueries = require("./videos.queries");

const getAllVideos = async () => {
  const result = await query(videoQueries.getAllVideos);
  return result.rows;
};

const getVideoById = async (videoId) => {
  const result = await query(videoQueries.getVideoById, [videoId]);
  return result.rows[0];
};

const getVideosByGradeId = async (gradeId) => {
  const result = await query(videoQueries.getVideosByGradeId, [gradeId]);
  return result.rows;
};

const getActiveVideos = async () => {
  const result = await query(videoQueries.getActiveVideos);
  return result.rows;
};

const getInactiveVideos = async () => {
  const result = await query(videoQueries.getInactiveVideos);
  return result.rows;
};

const createVideo = async (
  title,
  description,
  grade_id,
  youtube_url,
  createdBy,
) => {
  const result = await query(videoQueries.createVideo, [
    title,
    description,
    grade_id,
    youtube_url,
    createdBy,
  ]);
  return result.rows[0];
};


const updateVideo = async (
  videoId,
  title,
  description,
  grade_id,
  youtube_url,
  isActive,
) => {
  const existing = await query("SELECT * FROM videos WHERE id = $1", [videoId]);
  if (!existing.rows[0]) return null;

  const updated = {
    title: title ?? existing.rows[0].title,
    description: description ?? existing.rows[0].description,
    grade_id: grade_id ?? existing.rows[0].grade_id,
    youtube_url: youtube_url ?? existing.rows[0].youtube_url,
    is_active: isActive ?? existing.rows[0].is_active,
  };

  const result = await query(videoQueries.updateVideo, [
    videoId,
    updated.title,
    updated.description,
    updated.grade_id,
    updated.youtube_url,
    updated.is_active,
  ]);
  return result.rows[0];
};

const deleteVideo = async (videoId) => {
  const result = await query(videoQueries.deleteVideo, [videoId]);
  return result.rows[0];
};

module.exports = {
  getAllVideos,
  getVideoById,
  getVideosByGradeId,
  getActiveVideos,
  getInactiveVideos,
  createVideo,
  updateVideo,
  deleteVideo,
};
