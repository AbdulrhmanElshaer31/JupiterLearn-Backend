// src/modules/users/users.service.js

const { query } = require("../../config/database");
const userQueries = require("./users.queries");

const getAllAssistants = async () => {
  const result = await query(userQueries.getAllAssistants);
  return result.rows;
};

const getAllUsers = async () => {
  const result = await query(userQueries.getAllUsers);
  return result.rows;
};

module.exports = {
  getAllAssistants,
  getAllUsers,
};