const { query } = require("../../config/database");
const assignmentQueries = require("./assignments.queries");

const getAllAssignments = async () => {
  const result = await query(assignmentQueries.getAllAssignments);
  return result.rows;
};

const getAssignmentById = async (assignmentId) => {
  const result = await query(assignmentQueries.getAssignmentById, [assignmentId]);
  return result.rows[0];
};

const getAssignmentsByGradeId = async (gradeId) => {
  const result = await query(assignmentQueries.getAssignmentsByGradeId, [gradeId]);
  return result.rows;
};

const getAssignmentsByGroupId = async (groupId) => {
  const result = await query(assignmentQueries.getAssignmentsByGroupId, [groupId]);
  return result.rows;
};

const createAssignment = async (title, description, grade_id, group_id, file_path, full_mark, deadline, createdBy) => {
  const result = await query(assignmentQueries.createAssignment, [title, description, grade_id, group_id, file_path, full_mark, deadline, createdBy]);
  return result.rows[0];
};

const updateAssignment = async (assignmentId, title, description, grade_id, group_id, file_path, full_mark, deadline, is_closed) => {
  const existing = await query("SELECT * FROM assignments WHERE id = $1 AND deleted = 0", [assignmentId]);
  if (!existing.rows[0]) return null;
  
  const updated = {
    title: title ?? existing.rows[0].title,
    description: description ?? existing.rows[0].description,
    grade_id: grade_id ?? existing.rows[0].grade_id,
    group_id: group_id ?? existing.rows[0].group_id,
    file_path: file_path ?? existing.rows[0].file_path,
    full_mark: full_mark ?? existing.rows[0].full_mark,
    deadline: deadline ?? existing.rows[0].deadline,
    is_closed: is_closed ?? existing.rows[0].is_closed
  };
  
  const result = await query(assignmentQueries.updateAssignment, [
    assignmentId, updated.title, updated.description, updated.grade_id, updated.group_id,
    updated.file_path, updated.full_mark, updated.deadline, updated.is_closed
  ]);
  return result.rows[0];
};

const deleteAssignment = async (assignmentId) => {
  const result = await query(assignmentQueries.deleteAssignment, [assignmentId]);
  return result.rows[0];
};

module.exports = {
  getAllAssignments,
  getAssignmentById,
  getAssignmentsByGradeId,
  getAssignmentsByGroupId,
  createAssignment,
  updateAssignment,
  deleteAssignment
};