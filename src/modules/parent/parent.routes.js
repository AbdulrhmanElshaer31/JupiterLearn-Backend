const express = require("express");
const routes = express.Router();
const parentController = require("./parent.controller");

routes.get("/:token", parentController.getParentDashboard);

module.exports = routes;