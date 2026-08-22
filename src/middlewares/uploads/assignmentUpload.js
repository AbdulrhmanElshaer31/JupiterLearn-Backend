const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/assignments");
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    const originalname = path.basename(file.originalname, extension);

    const fileName = `${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}-${originalname}${extension}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("يسمح برفع ملفات Word و PDF فقط"));
  }
};

const assignmentUpload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

module.exports = assignmentUpload;
