const { SUPER_ADMIN_USERNAME, SUPER_ADMIN_PASSWORD } = require("../config/env");

const superAdminAuth = (req, res, next) => {
  // 1. التحقق من JWT Token (role = super_admin)
  if (req.clientRole !== "super_admin") {
    return res.status(403).json({
      success: false,
      message: "غير مصرح لك بالوصول - للمدير العام فقط",
    });
  }

  // 2. التحقق من Basic Auth إضافي
  const authHeader = req.headers["x-super-admin-key"];

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "مطلوب مفتاح المدير العام",
    });
  }

  const [type, token] = authHeader.trim().split(" ");

  if (type !== "Basic" || !token) {
    return res.status(401).json({
      success: false,
      message: "صيغة المفتاح غير صحيحة",
    });
  }

  const decodedToken = Buffer.from(token, "base64").toString("utf-8");
  const [username, password] = decodedToken.split(":");

  if (username !== SUPER_ADMIN_USERNAME || password !== SUPER_ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: "مفتاح المدير العام غير صحيح",
    });
  }

  next();
};

module.exports = superAdminAuth;
