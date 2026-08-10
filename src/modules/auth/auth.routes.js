const express = require("express");
const auth = require("./auth.controller");
const router = express.Router();
const validate = require("../../middlewares/validate.middleware");
const { loginSchema } = require("../../middlewares/validations/auth.validation");

router.post("/user/login", validate(loginSchema), auth.userLogin);
router.post("/student/login", validate(loginSchema), auth.StudentLogin);

module.exports = router;