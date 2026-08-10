const { query } = require("../../config/database");
const groupQueries = require("./groups.queries");

const getAllGroups = async () => {
  const result = await query(groupQueries.getAllGroups);
  return result.rows;
};

const getGroupById = async (groupId) => {
  const result = await query(groupQueries.getGroupById, [groupId]);
  return result.rows[0];
};

const getGroupsByGradeId = async (gradeId) => {
  const result = await query(groupQueries.getGroupsByGradeId, [gradeId]);
  return result.rows;
};

const getGroupStats = async (groupId) => {
  const result = await query(groupQueries.getGroupStats, [groupId]);
  return result.rows[0];
};

const getAllGroupsStats = async () => {
  const result = await query(groupQueries.getAllGroupsStats);
  return result.rows;
};

module.exports = {
  getAllGroups,
  getGroupById,
  getGroupsByGradeId,
  getGroupStats,
  getAllGroupsStats
};