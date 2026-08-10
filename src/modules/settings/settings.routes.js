const express = require("express");
const routes = express.Router();
const settingsController = require("./settings.controller");
const validate = require("../../middlewares/validate.middleware");
const { changePasswordSchema } = require("../../middlewares/validations/settings.validation");

routes.put("/change-password", validate(changePasswordSchema), settingsController.changeStudentPassword);

module.exports = routes;