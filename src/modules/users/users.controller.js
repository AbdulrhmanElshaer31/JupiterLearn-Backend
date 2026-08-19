// src/modules/users/users.controller.js

const userService = require("./users.service");

const getAllAssistants = async (req, res, next) => {
  try {
    const assistants = await userService.getAllAssistants();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: assistants,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAssistants,
  getAllUsers,
};