const express = require("express");
const auth = require("./auth.controller");
const router = express.Router();
router.post("/user/login", auth.userLogin);
router.post("/student/login", auth.StudentLogin);
module.exports = router;
