const settingsService = require("./settings.service");

const changeStudentPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) throw new Error("Passwords do not match!");
    const result = await settingsService.changeStudentPassword(req.clientId, newPassword, oldPassword);
    if (!result) throw new Error("Old password is incorrect!");
    return res.status(200).json({
      success: true,
      message: "Password Changed!",
    });
  } catch (error) {
    next(error);
  }
};

const changeUserPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) throw new Error("Passwords do not match!");
    const result = await settingsService.changeUserPassword(req.clientId, newPassword, oldPassword);
    if (!result) throw new Error("Old password is incorrect!");
    return res.status(200).json({
      success: true,
      message: "Password Changed!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  changeStudentPassword,
  changeUserPassword
};