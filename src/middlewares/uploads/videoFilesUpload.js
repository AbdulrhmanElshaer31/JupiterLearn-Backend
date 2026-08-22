const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "thumbnail") {
      cb(null, "uploads/videos/thumbnails");
    } else if (file.fieldname === "file") {
      cb(null, "uploads/videos/files");
    } else {
      cb(new Error("Invalid field name"));
    }
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
  if (file.fieldname === "thumbnail") {
    // الصور المصغرة
    const allowedImages = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedImages.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("يسمح برفع صور jpg و jpeg و png فقط"));
    }
  } else if (file.fieldname === "file") {
    // ملفات الشرح
    const allowedFiles = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedFiles.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("يسمح برفع ملفات PDF و Word فقط"));
    }
  } else {
    cb(new Error("Invalid field name"));
  }
};

const videoFilesUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

module.exports = videoFilesUpload;