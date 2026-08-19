const { query } = require("../../config/database");
const stdQueries = require("./students.queries");

const getStudentProfile = async (student_id) => {
  const result = await query(stdQueries.getStudentProfile, [student_id]);
  return result.rows[0];
};

const getStudentQuickStats = async (student_id) => {
  const result = await query(stdQueries.getStudentQuickStats, [student_id]);
  return result.rows[0];
};

const getAttendanceHistory = async (student_id, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const result = await query(stdQueries.getAttendanceHistory, [
    student_id,
    limit,
    offset,
  ]);
  return result.rows;
};

const getMonthlyAttendanceStats = async (student_id) => {
  const result = await query(stdQueries.getMonthlyAttendanceStats, [
    student_id,
  ]);
  return result.rows;
};

const getConsecutiveAbsences = async (student_id) => {
  const result = await query(stdQueries.getConsecutiveAbsences, [student_id]);
  return result.rows[0];
};

const getPaymentHistory = async (student_id, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const result = await query(stdQueries.getPaymentHistory, [
    student_id,
    limit,
    offset,
  ]);
  return result.rows;
};

const getRemainingBalance = async (student_id) => {
  const result = await query(stdQueries.getRemainingBalance, [student_id]);
  return result.rows[0];
};

const getCurrentSubscription = async (student_id) => {
  const result = await query(stdQueries.getCurrentSubscription, [student_id]);
  return result.rows[0];
};

const getStudentPaperExams = async (student_id, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const result = await query(stdQueries.getStudentPaperExams, [
    student_id,
    limit,
    offset,
  ]);
  return result.rows;
};

const getStudentExamResults = async (student_id) => {
  const result = await query(stdQueries.getStudentExamResults, [student_id]);
  return result.rows;
};

const getAvailableOnlineExams = async (student_id, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const result = await query(stdQueries.getAvailableOnlineExams, [
    student_id,
    limit,
    offset,
  ]);
  return result.rows;
};

const getStudentOnlineExams = async (student_id, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const result = await query(stdQueries.getStudentOnlineExams, [
    student_id,
    limit,
    offset,
  ]);
  return result.rows;
};

const getStudentExamAnswers = async (exam_id, student_id) => {
  const result = await query(stdQueries.getStudentExamAnswers, [
    exam_id,
    student_id,
  ]);
  return result.rows;
};

const getStudentAssignments = async (student_id, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const result = await query(stdQueries.getStudentAssignments, [
    student_id,
    limit,
    offset,
  ]);
  return result.rows;
};

const getStudentSubmissions = async (student_id, page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  const result = await query(stdQueries.getStudentSubmissions, [
    student_id,
    limit,
    offset,
  ]);
  return result.rows;
};

const getStudentPlaylists = async (student_id) => {
  const result = await query(stdQueries.getStudentPlaylists, [student_id]);
  return result.rows;
};

const getPlaylistVideos = async (playlist_id) => {
  const result = await query(stdQueries.getPlaylistVideos, [playlist_id]);
  return result.rows;
};

const getAllStudents = async (
  page = 1,
  limit = 20,
  search = "",
  gradeId = null,
  groupId = null,
) => {
  const offset = (page - 1) * limit;
  const result = await query(stdQueries.getAllStudents, [
    `%${search}%`,
    gradeId,
    groupId,
    limit,
    offset,
  ]);
  return result.rows;
};

const getStudentsCount = async (
  search = "",
  gradeId = null,
  groupId = null,
) => {
  const result = await query(stdQueries.getStudentsCount, [
    `%${search}%`,
    gradeId,
    groupId,
  ]);
  return parseInt(result.rows[0].count);
};

const getStudentByBarcode = async (barcode) => {
  const result = await query(stdQueries.getStudentByBarcode, [barcode]);
  return result.rows[0];
};

const getStudentById = async (studentId) => {
  const result = await query(stdQueries.getStudentById, [studentId]);
  return result.rows[0];
};

const getStudentSubscriptions = async (student_id) => {
  const result = await query(
    `
    SELECT 
      sub.id,
      sub.month,
      sub.required_amount,
      sub.status,
      COALESCE(SUM(p.amount), 0) AS paid_amount,
      sub.required_amount - COALESCE(SUM(p.amount), 0) AS remaining_amount
    FROM subscriptions sub
    LEFT JOIN payments p ON sub.id = p.subscription_id AND p.deleted = 0
    WHERE sub.student_id = $1 AND sub.deleted = 0
    GROUP BY sub.id, sub.month, sub.required_amount, sub.status
    ORDER BY sub.month DESC
  `,
    [student_id],
  );
  return result.rows;
};

const getAllGrades = async () => {
  const result = await query(
    `SELECT id, name FROM grades WHERE deleted = 0 ORDER BY name ASC`,
  );
  return result.rows;
};

const getAllGroups = async () => {
  const result = await query(
    `SELECT id, name, grade_id FROM groups WHERE deleted = 0 ORDER BY name ASC`,
  );
  return result.rows;
};

const getStudentFullRecords = async (studentId) => {
  const [
    profile,
    stats,
    attendanceRecords,
    paymentRecords,
    examRecords,
    onlineExamRecords,
    assignmentRecords,
  ] = await Promise.all([
    getStudentProfile(studentId),
    getStudentQuickStats(studentId),
    getAttendanceHistory(studentId, 1, 100),
    getPaymentHistory(studentId, 1, 100),
    getStudentPaperExams(studentId, 1, 100),
    getStudentOnlineExams(studentId, 1, 100),
    getStudentSubmissions(studentId, 1, 100),
  ]);

  return {
    profile,
    stats,
    attendanceRecords,
    paymentRecords,
    examRecords,
    onlineExamRecords,
    assignmentRecords,
  };
};

const startOnlineExam = async (examId, studentId) => {
  const exam = await query(stdQueries.checkExamAvailability, [
    examId,
    studentId,
  ]);
  if (!exam.rows[0]) throw new Error("Exam not available!");

  const now = new Date();
  if (now < new Date(exam.rows[0].start_at))
    throw new Error("Exam not started yet!");
  if (now > new Date(exam.rows[0].end_at)) throw new Error("Exam has ended!");

  await query(
    `DELETE FROM student_exams WHERE exam_id = $1 AND student_id = $2 AND submitted_at IS NULL`,
    [examId, studentId],
  );

  const existing = await query(stdQueries.checkExistingAttempt, [
    examId,
    studentId,
  ]);
  if (existing.rows.length > 0) throw new Error("Already attempted!");

  const attempt = await query(stdQueries.createExamAttempt, [
    examId,
    studentId,
  ]);

  const questions = await query(stdQueries.getExamQuestions, [
    examId,
    exam.rows[0].randomize_questions,
  ]);

  for (const q of questions.rows) {
    if (q.type === "mcq" || q.type === "true_false") {
      const options = await query(stdQueries.getQuestionOptions, [q.id]);
      q.options = options.rows;
    }
  }

  return {
    attempt_id: attempt.rows[0].id,
    questions: questions.rows,
    duration_minutes: exam.rows[0].duration_minutes,
    started_at: attempt.rows[0].started_at,
    end_at: exam.rows[0].end_at,
    full_mark: exam.rows[0].full_mark,
  };
};

const answerQuestion = async (
  examId,
  studentId,
  questionId,
  selectedOptionId,
) => {
  const active = await query(stdQueries.checkActiveAttempt, [
    examId,
    studentId,
  ]);
  if (!active.rows[0]) throw new Error("No active exam attempt!");

  const question = await query(stdQueries.checkQuestionBelongsToExam, [
    questionId,
    examId,
  ]);
  if (!question.rows[0]) throw new Error("Question not in this exam!");

  const option = await query(stdQueries.checkOptionBelongsToQuestion, [
    selectedOptionId,
    questionId,
  ]);
  if (!option.rows[0]) throw new Error("Option not for this question!");

  const isCorrect = option.rows[0].is_correct;

  const existing = await query(stdQueries.checkExistingAnswer, [
    examId,
    studentId,
    questionId,
  ]);

  if (existing.rows.length > 0) {
    const updated = await query(stdQueries.updateAnswer, [
      selectedOptionId,
      isCorrect,
      examId,
      studentId,
      questionId,
    ]);
    return { id: updated.rows[0].id, updated: true };
  } else {
    const inserted = await query(stdQueries.insertAnswer, [
      examId,
      studentId,
      questionId,
      selectedOptionId,
      isCorrect,
    ]);
    return { id: inserted.rows[0].id, inserted: true };
  }
};

const submitOnlineExam = async (attemptId, studentId, answers) => {
  const active = await query(
    `SELECT se.id, se.exam_id, se.started_at, oe.duration_minutes, oe.end_at 
     FROM student_exams se
     JOIN online_exams oe ON se.exam_id = oe.id
     WHERE se.id = $1 AND se.student_id = $2 AND se.submitted_at IS NULL`,
    [attemptId, studentId],
  );

  if (!active.rows[0]) throw new Error("No active exam attempt!");

  const now = new Date();
  if (now > new Date(active.rows[0].end_at)) {
    await query(stdQueries.finalizeExamAttempt2, [
      attemptId,
      studentId,
      0,
      0,
      0,
    ]);
    throw new Error("Exam time has ended!");
  }

  const examId = active.rows[0].exam_id;
  const answersJson = JSON.stringify(answers || []);

  await query(stdQueries.insertBulkAnswers, [examId, studentId, answersJson]);

  const score = await query(stdQueries.calculateScoreBulk, [examId, studentId]);

  const result = await query(stdQueries.finalizeExamAttempt2, [
    attemptId,
    studentId,
    score.rows[0].score,
    score.rows[0].total_questions,
    score.rows[0].correct_answers,
  ]);

  return {
    attempt_id: result.rows[0].id,
    score: parseFloat(result.rows[0].score || score.rows[0].score),
    total_questions: parseInt(
      result.rows[0].total_questions || score.rows[0].total_questions,
    ),
    correct_answers: parseInt(
      result.rows[0].correct_answers || score.rows[0].correct_answers,
    ),
    submitted_at: result.rows[0].submitted_at,
  };
};

const submitAssignment = async (assignmentId, studentId, filePath) => {
  const assignment = await query(stdQueries.checkAssignmentAvailable, [
    assignmentId,
    studentId,
  ]);
  if (!assignment.rows[0]) throw new Error("Assignment not available!");
  if (assignment.rows[0].is_closed) throw new Error("Assignment is closed!");

  const existing = await query(stdQueries.checkExistingSubmission, [
    assignmentId,
    studentId,
  ]);

  if (existing.rows.length > 0) {
    const updated = await query(stdQueries.updateAssignmentSubmission, [
      assignmentId,
      studentId,
      filePath,
    ]);
    return { id: updated.rows[0].id, updated: true };
  } else {
    const inserted = await query(stdQueries.submitAssignment, [
      assignmentId,
      studentId,
      filePath,
    ]);
    return { id: inserted.rows[0].id, inserted: true };
  }
};

module.exports = {
  startOnlineExam,
  answerQuestion,
  submitOnlineExam,
  submitAssignment,
  getStudentProfile,
  getStudentQuickStats,
  getAttendanceHistory,
  getMonthlyAttendanceStats,
  getConsecutiveAbsences,
  getPaymentHistory,
  getRemainingBalance,
  getCurrentSubscription,
  getStudentPaperExams,
  getStudentExamResults,
  getAvailableOnlineExams,
  getStudentOnlineExams,
  getStudentExamAnswers,
  getStudentAssignments,
  getStudentSubmissions,
  getStudentPlaylists,
  getPlaylistVideos,
  getAllStudents,
  getStudentByBarcode,
  getStudentById,
  getStudentsCount,
  getStudentSubscriptions,
  getAllGrades,
  getAllGroups,
  getStudentFullRecords,
};
