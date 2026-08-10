const { query } = require("../../config/database");
const settingsQueries = require("./settings.queries");

const changeStudentPassword = async (studentId, newPassword, oldPassword) => {
  const result = await query(settingsQueries.changeStudentPassword, [studentId, newPassword, oldPassword]);
  return result.rows[0];
};

const changeUserPassword = async (userId, newPassword, oldPassword) => {
  const result = await query(settingsQueries.changeUserPassword, [userId, newPassword, oldPassword]);
  return result.rows[0];
};

module.exports = {
  changeStudentPassword,
  changeUserPassword
};