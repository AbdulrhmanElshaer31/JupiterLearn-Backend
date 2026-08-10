const groupService = require("./groups.service");

const getAllGroups = async (req, res, next) => {
  try {
    const groups = await groupService.getAllGroups();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: groups,
    });
  } catch (error) {
    next(error);
  }
};

const getGroupById = async (req, res, next) => {
  try {
    const group = await groupService.getGroupById(req.params.groupId);
    if (!group) throw new Error("Group Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

const getGroupsByGradeId = async (req, res, next) => {
  try {
    const groups = await groupService.getGroupsByGradeId(req.params.gradeId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: groups,
    });
  } catch (error) {
    next(error);
  }
};

const getGroupStats = async (req, res, next) => {
  try {
    const stats = await groupService.getGroupStats(req.params.groupId);
    if (!stats) throw new Error("Group Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

const getAllGroupsStats = async (req, res, next) => {
  try {
    const stats = await groupService.getAllGroupsStats();
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
  getAllGroups,
  getGroupById,
  getGroupsByGradeId,
  getGroupStats,
  getAllGroupsStats,
};
