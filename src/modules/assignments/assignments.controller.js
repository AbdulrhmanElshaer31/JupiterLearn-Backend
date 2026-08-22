const assignmentService = require("./assignments.service");
const path = require("path");
const getAllAssignments = async (req, res, next) => {
  try {
    const assignments = await assignmentService.getAllAssignments();
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: assignments,
    });
  } catch (error) {
    next(error);
  }
};

const getAssignmentById = async (req, res, next) => {
  try {
    const assignment = await assignmentService.getAssignmentById(
      req.params.assignmentId,
    );
    if (!assignment) throw new Error("Assignment Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: assignment,
    });
  } catch (error) {
    next(error);
  }
};

const getAssignmentsByGradeId = async (req, res, next) => {
  try {
    const assignments = await assignmentService.getAssignmentsByGradeId(
      req.params.gradeId,
    );
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: assignments,
    });
  } catch (error) {
    next(error);
  }
};

const getAssignmentsByGroupId = async (req, res, next) => {
  try {
    const assignments = await assignmentService.getAssignmentsByGroupId(
      req.params.groupId,
    );
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: assignments,
    });
  } catch (error) {
    next(error);
  }
};

const createAssignment = async (req, res, next) => {
  try {
    console.log(req.body);

    const { title, description, grade_id, group_id, full_mark, deadline } =
      req.body;

    const file_path = req.file.path;

    const assignment = await assignmentService.createAssignment(
      title,
      description,
      grade_id,
      group_id,
      file_path,
      full_mark,
      deadline,
      req.clientId,
    );

    return res.status(201).json({
      success: true,
      message: "Assignment Created!",
      data: assignment,
    });
  } catch (error) {
    next(error);
  }
};

const updateAssignment = async (req, res, next) => {
  try {
    const {
      title,
      description,
      grade_id,
      group_id,
      file_path,
      full_mark,
      deadline,
      is_closed,
    } = req.body;
    const assignment = await assignmentService.updateAssignment(
      req.params.assignmentId,
      title,
      description,
      grade_id,
      group_id,
      file_path,
      full_mark,
      deadline,
      is_closed,
    );
    if (!assignment) throw new Error("Assignment Not Found!");
    return res.status(200).json({
      success: true,
      message: "Assignment Updated!",
      data: assignment,
    });
  } catch (error) {
    next(error);
  }
};

const downloadAssignment = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;

    const assignment = await assignmentService.getAssignmentById(assignmentId);

    if (!assignment) {
      throw new Error("الملف غير موجود");
    }

    const filePath = path.join(__dirname, "../../../", assignment.file_path);

    return res.download(filePath);
  } catch (error) {
    next(error);
  }
};

const deleteAssignment = async (req, res, next) => {
  try {
    const assignment = await assignmentService.deleteAssignment(
      req.params.assignmentId,
    );
    if (!assignment) throw new Error("Assignment Not Found!");
    return res.status(200).json({
      success: true,
      message: "Assignment Deleted!",
      data: assignment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAssignments,
  getAssignmentById,
  getAssignmentsByGradeId,
  getAssignmentsByGroupId,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  downloadAssignment,
};
