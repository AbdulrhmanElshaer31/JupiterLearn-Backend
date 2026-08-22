const fs = require("fs");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }

    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

module.exports = validate;
