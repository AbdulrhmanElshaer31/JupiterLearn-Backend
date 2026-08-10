const teacherAuth = (req, res, next) => {
  if (req.clientRole !== 'teacher') {
    return res.status(403).json({
      success: false,
      message: "Access denied. Teacher only.",
    });
  }
  next();
};

module.exports = teacherAuth;