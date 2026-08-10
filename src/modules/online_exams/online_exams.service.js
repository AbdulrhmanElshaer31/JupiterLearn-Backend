// online_exams.service.js

const { query } = require("../../config/database");
const onlineExamQueries = require("./online_exams.queries");

const getAllOnlineExams = async () => {
  const result = await query(onlineExamQueries.getAllOnlineExams);
  return result.rows;
};

const getOnlineExamById = async (examId) => {
  const result = await query(onlineExamQueries.getOnlineExamById, [examId]);
  return result.rows[0];
};

const getOnlineExamsByGradeId = async (gradeId) => {
  const result = await query(onlineExamQueries.getOnlineExamsByGradeId, [gradeId]);
  return result.rows;
};

const getOnlineExamsByGroupId = async (groupId) => {
  const result = await query(onlineExamQueries.getOnlineExamsByGroupId, [groupId]);
  return result.rows;
};

const getOnlineExamStats = async (examId) => {
  const result = await query(onlineExamQueries.getOnlineExamStats, [examId]);
  return result.rows[0];
};

const getGradeOnlineExamStats = async (gradeId) => {
  const result = await query(onlineExamQueries.getGradeOnlineExamStats, [gradeId]);
  return result.rows[0];
};

const createOnlineExam = async (title, description, gradeId, groupId, durationMinutes, startAt, endAt, fullMark, randomizeQuestions, createdBy) => {
  const result = await query(onlineExamQueries.createOnlineExam, [title, description, gradeId, groupId, durationMinutes, startAt, endAt, fullMark, randomizeQuestions, createdBy]);
  return result.rows[0];
};


const updateOnlineExam = async (examId, title, description, gradeId, groupId, durationMinutes, startAt, endAt, fullMark, randomizeQuestions) => {
  const existing = await query("SELECT * FROM online_exams WHERE id = $1", [examId]);
  if (!existing.rows[0]) return null;
  
  const updated = {
    title: title ?? existing.rows[0].title,
    description: description ?? existing.rows[0].description,
    grade_id: gradeId ?? existing.rows[0].grade_id,
    group_id: groupId ?? existing.rows[0].group_id,
    duration_minutes: durationMinutes ?? existing.rows[0].duration_minutes,
    start_at: startAt ?? existing.rows[0].start_at,
    end_at: endAt ?? existing.rows[0].end_at,
    full_mark: fullMark ?? existing.rows[0].full_mark,
    randomize_questions: randomizeQuestions ?? existing.rows[0].randomize_questions
  };
  
  const result = await query(onlineExamQueries.updateOnlineExam, [
    examId, updated.title, updated.description, updated.grade_id, updated.group_id,
    updated.duration_minutes, updated.start_at, updated.end_at, updated.full_mark, updated.randomize_questions
  ]);
  return result.rows[0];
};
const deleteOnlineExam = async (examId) => {
  const result = await query(onlineExamQueries.deleteOnlineExam, [examId]);
  return result.rows[0];
};

module.exports = {
  getAllOnlineExams,
  getOnlineExamById,
  getOnlineExamsByGradeId,
  getOnlineExamsByGroupId,
  getOnlineExamStats,
  getGradeOnlineExamStats,
  createOnlineExam,
  updateOnlineExam,
  deleteOnlineExam
};