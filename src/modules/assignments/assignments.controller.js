const assignmentService = require("./assignments.service");

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
    const {
      title,
      description,
      gradeId,
      groupId,
      filePath,
      fullMark,
      deadline,
    } = req.body;
    const assignment = await assignmentService.createAssignment(
      title,
      description,
      gradeId,
      groupId,
      filePath,
      fullMark,
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
      gradeId,
      groupId,
      filePath,
      fullMark,
      deadline,
      isClosed,
    } = req.body;
    const assignment = await assignmentService.updateAssignment(
      req.params.assignmentId,
      title,
      description,
      gradeId,
      groupId,
      filePath,
      fullMark,
      deadline,
      isClosed,
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
};
