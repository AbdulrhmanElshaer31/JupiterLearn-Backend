const groupService = require("./groups.service");

// Create a new group
const createGroup = async (req, res, next) => {
  try {
    const group = await groupService.createGroup(req.body);

    if (!group) {
      throw new Error("فشل إنشاء المجموعة حاول مرة أخرى!");
    }

    return res.status(201).json({
      success: true,
      message: "تم إنشاء المجموعة بنجاح!",
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

// Get all groups
const getAllGroups = async (req, res, next) => {
  try {
    const groups = await groupService.getAllGroups();

    if (!groups) {
      throw new Error("فشل تحميل المجموعات حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل المجموعات بنجاح!",
      data: groups,
    });
  } catch (error) {
    next(error);
  }
};

// Get group by ID
const getGroupById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const group = await groupService.getGroupById(id);

    if (!group) {
      throw new Error("فشل تحميل المجموعة حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل المجموعة بنجاح!",
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

// Find group by name
const findGroupByName = async (req, res, next) => {
  try {
    const { name, grade_id } = req.body;

    const group = await groupService.findGroupByName(name, grade_id);

    if (!group) {
      throw new Error("فشل تحميل المجموعة حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل المجموعة بنجاح!",
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

// Get groups by grade
const getGroupsByGradeId = async (req, res, next) => {
  try {
    const { gradeId } = req.params;

    const groups = await groupService.getGroupsByGradeId(gradeId);

    if (!groups) {
      throw new Error("فشل تحميل المجموعات حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل المجموعات بنجاح!",
      data: groups,
    });
  } catch (error) {
    next(error);
  }
};

// Update group
const updateGroup = async (req, res, next) => {
  try {
    const { id } = req.params;

    const group = await groupService.updateGroup(id, req.body);

    if (!group) {
      throw new Error("فشل تعديل المجموعة حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تعديل المجموعة بنجاح!",
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

// Soft delete group
const softDeleteGroup = async (req, res, next) => {
  try {
    const { id } = req.params;

    const group = await groupService.softDeleteGroup(id);

    if (!group) {
      throw new Error("فشل حذف المجموعة حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم حذف المجموعة بنجاح!",
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

// Hard delete group
const hardDeleteGroup = async (req, res, next) => {
  try {
    const { id } = req.params;

    const group = await groupService.hardDeleteGroup(id);

    if (!group) {
      throw new Error("فشل حذف المجموعة نهائيًا حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم حذف المجموعة نهائيًا بنجاح!",
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

// Get group stats
const getGroupStats = async (req, res, next) => {
  try {
    const { id } = req.params;

    const stats = await groupService.getGroupStats(id);

    if (!stats) {
      throw new Error("فشل تحميل إحصائيات المجموعة حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل إحصائيات المجموعة بنجاح!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

// Get all groups stats
const getAllGroupsStats = async (req, res, next) => {
  try {
    const stats = await groupService.getAllGroupsStats();

    if (!stats) {
      throw new Error("فشل تحميل إحصائيات المجموعات حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل إحصائيات المجموعات بنجاح!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

// Get groups with students count
const getGroupsWithStudentsCount = async (req, res, next) => {
  try {
    const groups = await groupService.getGroupsWithStudentsCount();

    if (!groups) {
      throw new Error("فشل تحميل المجموعات حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل المجموعات بنجاح!",
      data: groups,
    });
  } catch (error) {
    next(error);
  }
};

// Get groups with grade name
const getGroupsWithGradeName = async (req, res, next) => {
  try {
    const groups = await groupService.getGroupsWithGradeName();

    if (!groups) {
      throw new Error("فشل تحميل المجموعات حاول مرة أخرى!");
    }

    return res.status(200).json({
      success: true,
      message: "تم تحميل المجموعات بنجاح!",
      data: groups,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById,
  findGroupByName,
  getGroupsByGradeId,
  updateGroup,
  softDeleteGroup,
  hardDeleteGroup,
  getGroupStats,
  getAllGroupsStats,
  getGroupsWithStudentsCount,
  getGroupsWithGradeName,
};
