const express = require("express");
const routes = express.Router();
const optionController = require("./options.controller");
const validate = require("../../middlewares/validate.middleware");
const { createOptionSchema, updateOptionSchema } = require("../../middlewares/validations/option.validation");

routes.get("/question/:questionId", optionController.getOptionsByQuestionId);
routes.get("/:optionId", optionController.getOptionById);
routes.post("/", validate(createOptionSchema), optionController.createOption);
routes.put("/:optionId", validate(updateOptionSchema), optionController.updateOption);
routes.delete("/:optionId", optionController.deleteOption);

module.exports = routes;