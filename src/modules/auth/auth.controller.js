//============== import service and creatToken ==============\\
const authService = require("./auth.service");
const {
  creatToken,
  verifyToken
} = require("../../utils/jwt");
const ROLES = require("../../constants/roles");
const StudentLogin = async (req, res, next) => {
  try {
    const student = await authService.studentAuth(req.body);
    if (student == null) {
      throw new Error("Login Failed Check Credentials!");
    }
    const payload = {
      id: student.id,
      barcode:student.barcode,
      role: ROLES.STUDENT,
    };
    const token = creatToken(payload);
    res.status(200).json({
      success: true,
      token,
      student: {
        ...payload,
        full_name: student.full_name,
        phone: student.phone,
        grade_id: student.grade_id,
      },
    });
  } catch (error) {
    next(error);
  }
};
const userLogin = async (req, res, next) => {
  try {
    const user = await authService.userAuth(req.body);
    if (user == null) {
      throw new Error("Login Failed Check Credintals!");
    }
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = creatToken(payload);
    res.status(200).json({
      token,
      user: {
        ...payload,
        full_name: user.full_name,
        phone: user.phone,
      },
    });
  } catch (error) {
    next(error);
  }
};
const parentAccess = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      throw new Error("Token is required!");
    }
    const student = await authService.parentAccess(token);
    if (!student) {
      throw new Error("Invalid or expired token!");
    }
    const payload = {
      id: student.id,
      barcode: student.barcode,
      role: ROLES.PARENT, 
    };
    const newToken = creatToken(payload);
    res.status(200).json({
      success: true,
      token: newToken,
      student: {
        ...payload,
        full_name: student.full_name,
        phone: student.phone,
        grade_id: student.grade_id,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  StudentLogin,
  userLogin,
  parentAccess,
};
