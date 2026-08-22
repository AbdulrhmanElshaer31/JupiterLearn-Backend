const userService = require("./users.service");

// Create user
const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);

    if (!user) {
      throw new Error("فشل إنشاء المستخدم حاول مرة أخرى!");
    }

    return res.status(201).json({
      success: true,
      message: "تم إنشاء المستخدم بنجاح!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const users = await userService.getAllUsers(page);

    return res.status(200).json({
      success: true,
      message: "تم تحميل المستخدمين بنجاح!",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);

    if (!user) {
      throw new Error("فشل تحميل المستخدم حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل المستخدم بنجاح!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Get all assistants
const getAllAssistants = async (req, res, next) => {
  try {
    const assistants = await userService.getAllAssistants();

    return res.status(200).json({
      success: true,
      message: "تم تحميل المساعدين بنجاح!",
      data: assistants,
    });
  } catch (error) {
    next(error);
  }
};

// Get all teachers
const getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await userService.getAllTeachers();

    return res.status(200).json({
      success: true,
      message: "تم تحميل المدرسين بنجاح!",
      data: teachers,
    });
  } catch (error) {
    next(error);
  }
};

// Find user by phone
const findUserByPhone = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const user = await userService.findUserByPhone(phone);

    if (!user) {
      throw new Error("فشل تحميل المستخدم حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل المستخدم بنجاح!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Update user
const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.updateUser(userId, req.body);

    if (!user) {
      throw new Error("فشل تعديل المستخدم حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تعديل المستخدم بنجاح!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Update user password
const updateUserPassword = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;
    const user = await userService.updateUserPassword(userId, password);

    if (!user) {
      throw new Error("فشل تعديل كلمة المرور حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تعديل كلمة المرور بنجاح!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Toggle user active
const toggleUserActive = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.toggleUserActive(userId);

    if (!user) {
      throw new Error("فشل تغيير حالة المستخدم حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تغيير حالة المستخدم بنجاح!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Soft delete user
const softDeleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.softDeleteUser(userId);

    if (!user) {
      throw new Error("فشل حذف المستخدم حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم حذف المستخدم بنجاح!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Hard delete user
const hardDeleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.hardDeleteUser(userId);

    if (!user) {
      throw new Error("فشل حذف المستخدم نهائيًا حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم حذف المستخدم نهائيًا بنجاح!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getAllAssistants,
  getAllTeachers,
  findUserByPhone,
  updateUser,
  updateUserPassword,
  toggleUserActive,
  softDeleteUser,
  hardDeleteUser,
};
