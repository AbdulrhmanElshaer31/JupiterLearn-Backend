// modules/assistant/assistant.routes.js

const express = require("express");
const routes = express.Router();

const gradesController = require("../grades/grades.controller");
const groupsController = require("../groups/groups.controller");
const studentsController = require("../students/students.controller");
const attendanceController = require("../attendance/attendance.controller");
const paymentsController = require("../payments/payments.controller");
const subscriptionsController = require("../subscriptions/subscriptions.controller");
const examsController = require("../exams/exams.controller");
const examResultsController = require("../exam_results/exam_results.controller");
const onlineExamController = require("../online_exams/online_exams.controller");
const questionController = require("../questions/questions.controller");
const optionController = require("../options/options.controller");
const studentExamController = require("../student_exams/student_exams.controller");
const studentAnswerController = require("../student_answers/student_answers.controller");
const assignmentController = require("../assignments/assignments.controller");
const assignmentSubmissionController = require("../assignment_submissions/assignment_submissions.controller");
const videoController = require("../videos/videos.controller");
const playlistController = require("../playlists/playlists.controller");
const playlistVideoController = require("../playlist_videos/playlist_videos.controller");
const settingsController = require("../settings/settings.controller");

routes.get("/grades", gradesController.getAllGrades);
routes.get("/grades/active", gradesController.getActiveGrades);
routes.get("/grades/inactive", gradesController.getInactiveGrades);
routes.get("/grades/stats/all", gradesController.getAllGradesStats);
routes.get("/grades/:gradeId", gradesController.getGradeById);
routes.get("/grades/:gradeId/stats", gradesController.getGradeStats);
routes.get(
  "/payments/students-status",
  paymentsController.getAllStudentsPaymentStatus,
);

routes.get("/groups", groupsController.getAllGroups);
routes.get("/groups/stats/all", groupsController.getAllGroupsStats);
routes.get("/groups/grade/:gradeId", groupsController.getGroupsByGradeId);
routes.get("/groups/:groupId", groupsController.getGroupById);
routes.get("/groups/:groupId/stats", groupsController.getGroupStats);

// Students Routes - بالترتيب الصحيح
routes.get("/students", studentsController.getAllStudents);
routes.get("/students/search", studentsController.searchStudentByBarcode);
routes.get("/students/filters", studentsController.getStudentFilters);
routes.get(
  "/students/:studentId/full-records",
  studentsController.getStudentFullRecords,
);
routes.get("/students/:studentId", studentsController.getStudentById);
routes.get(
  "/students/:studentId/profile",
  studentsController.getStudentProfile,
);
routes.get(
  "/students/:studentId/stats",
  studentsController.getStudentQuickStats,
);

routes.get(
  "/attendance/overall",
  attendanceController.getOverallAttendanceStats,
);
routes.get(
  "/attendance/consecutive-absences",
  attendanceController.getStudentsWithThreeConsecutiveAbsences,
);
routes.get(
  "/attendance/grade/:gradeId/stats",
  attendanceController.getGradeAttendanceStats,
);
routes.get(
  "/attendance/group/:groupId/date/:date",
  attendanceController.getAttendanceByGroupAndDate,
);
routes.get(
  "/attendance/group/:groupId/month/:month",
  attendanceController.getAttendanceByGroupAndMonth,
);

routes.get("/payments/collections", paymentsController.getMonthlyCollections);
routes.get(
  "/payments/unpaid",
  paymentsController.getUnpaidStudentsCurrentMonth,
);
routes.get("/payments/overall", paymentsController.getOverallPaymentStats);
routes.get(
  "/payments/grade/:gradeId/stats",
  paymentsController.getGradePaymentStats,
);
routes.get(
  "/payments/group/:groupId/stats",
  paymentsController.getGroupPaymentStats,
);
routes.get(
  "/payments/grade/:gradeId/month/:month",
  paymentsController.getPaymentsByGradeAndMonth,
);
routes.get(
  "/payments/group/:groupId/month/:month",
  paymentsController.getPaymentsByGroupAndMonth,
);

routes.get(
  "/subscriptions/without-current",
  subscriptionsController.getStudentsWithoutSubscriptionCurrentMonth,
);
routes.get(
  "/subscriptions/overall",
  subscriptionsController.getOverallSubscriptionStats,
);
routes.get(
  "/subscriptions/student/:studentId",
  subscriptionsController.getStudentSubscriptions,
);
routes.get(
  "/subscriptions/month/:month",
  subscriptionsController.getSubscriptionsByMonth,
);
routes.get(
  "/subscriptions/grade/:gradeId/stats",
  subscriptionsController.getGradeSubscriptionStats,
);
routes.get(
  "/subscriptions/group/:groupId/stats",
  subscriptionsController.getGroupSubscriptionStats,
);

routes.get("/exams", examsController.getAllExams);
routes.get("/exams/grade/:gradeId", examsController.getExamsByGradeId);
routes.get("/exams/group/:groupId", examsController.getExamsByGroupId);
routes.get("/exams/grade/:gradeId/stats", examsController.getGradeExamStats);
routes.get("/exams/:examId", examsController.getExamById);
routes.get("/exams/:examId/stats", examsController.getExamStats);

routes.get(
  "/exam-results/grade/:gradeId/stats",
  examResultsController.getGradeExamResultsStats,
);
routes.get(
  "/exam-results/group/:groupId/stats",
  examResultsController.getGroupExamResultsStats,
);
routes.get("/exam-results/:examId", examResultsController.getExamResults);
routes.get(
  "/exam-results/:examId/stats",
  examResultsController.getExamResultStats,
);

routes.get("/online-exams", onlineExamController.getAllOnlineExams);
routes.get(
  "/online-exams/grade/:gradeId",
  onlineExamController.getOnlineExamsByGradeId,
);
routes.get(
  "/online-exams/group/:groupId",
  onlineExamController.getOnlineExamsByGroupId,
);
routes.get(
  "/online-exams/stats/grade/:gradeId",
  onlineExamController.getGradeOnlineExamStats,
);
routes.get("/online-exams/:examId", onlineExamController.getOnlineExamById);
routes.get(
  "/online-exams/stats/:examId",
  onlineExamController.getOnlineExamStats,
);
routes.post("/online-exams", onlineExamController.createOnlineExam);
routes.put("/online-exams/:examId", onlineExamController.updateOnlineExam);
routes.delete("/online-exams/:examId", onlineExamController.deleteOnlineExam);

routes.get("/questions/exam/:examId", questionController.getQuestionsByExamId);
routes.get("/questions/:questionId", questionController.getQuestionById);
routes.post("/questions", questionController.createQuestion);
routes.put("/questions/:questionId", questionController.updateQuestion);
routes.delete("/questions/:questionId", questionController.deleteQuestion);

routes.get(
  "/options/question/:questionId",
  optionController.getOptionsByQuestionId,
);
routes.get("/options/:optionId", optionController.getOptionById);
routes.post("/options", optionController.createOption);
routes.put("/options/:optionId", optionController.updateOption);
routes.delete("/options/:optionId", optionController.deleteOption);

routes.get(
  "/student-exams/grade/:gradeId/stats",
  studentExamController.getGradeExamAttemptsStats,
);
routes.get(
  "/student-exams/group/:groupId/stats",
  studentExamController.getGroupExamAttemptsStats,
);
routes.get(
  "/student-exams/:examId",
  studentExamController.getStudentExamsByExamId,
);
routes.get(
  "/student-exams/:examId/stats",
  studentExamController.getExamAttemptStats,
);

routes.get(
  "/student-answers/question/:questionId/stats",
  studentAnswerController.getQuestionAnswerStats,
);
routes.get(
  "/student-answers/question/:questionId/options",
  studentAnswerController.getMostSelectedOptions,
);

routes.get("/assignments", assignmentController.getAllAssignments);
routes.get(
  "/assignments/grade/:gradeId",
  assignmentController.getAssignmentsByGradeId,
);
routes.get(
  "/assignments/group/:groupId",
  assignmentController.getAssignmentsByGroupId,
);
routes.get(
  "/assignments/:assignmentId",
  assignmentController.getAssignmentById,
);
routes.post("/assignments", assignmentController.createAssignment);
routes.put("/assignments/:assignmentId", assignmentController.updateAssignment);
routes.delete(
  "/assignments/:assignmentId",
  assignmentController.deleteAssignment,
);

routes.get(
  "/assignment-submissions/stats/grade/:gradeId",
  assignmentSubmissionController.getGradeAssignmentSubmissionStats,
);
routes.get(
  "/assignment-submissions/stats/group/:groupId",
  assignmentSubmissionController.getGroupAssignmentSubmissionStats,
);
routes.get(
  "/assignment-submissions/assignment/:assignmentId",
  assignmentSubmissionController.getSubmissionsByAssignmentId,
);
routes.get(
  "/assignment-submissions/assignment/:assignmentId/student/:studentId",
  assignmentSubmissionController.getStudentSubmission,
);
routes.get(
  "/assignment-submissions/stats/assignment/:assignmentId",
  assignmentSubmissionController.getAssignmentSubmissionStats,
);
routes.put(
  "/assignment-submissions/:submissionId/grade",
  assignmentSubmissionController.gradeSubmission,
);

routes.get("/videos", videoController.getAllVideos);
routes.get("/videos/active", videoController.getActiveVideos);
routes.get("/videos/inactive", videoController.getInactiveVideos);
routes.get("/videos/grade/:gradeId", videoController.getVideosByGradeId);
routes.get("/videos/:videoId", videoController.getVideoById);
routes.post("/videos", videoController.createVideo);
routes.put("/videos/:videoId", videoController.updateVideo);
routes.delete("/videos/:videoId", videoController.deleteVideo);

routes.get("/playlists", playlistController.getAllPlaylists);
routes.get("/playlists/active", playlistController.getActivePlaylists);
routes.get("/playlists/inactive", playlistController.getInactivePlaylists);
routes.get(
  "/playlists/grade/:gradeId",
  playlistController.getPlaylistsByGradeId,
);
routes.get(
  "/playlists/stats/grade/:gradeId",
  playlistController.getGradePlaylistsStats,
);
routes.get("/playlists/:playlistId", playlistController.getPlaylistById);
routes.get("/playlists/stats/:playlistId", playlistController.getPlaylistStats);
routes.post("/playlists", playlistController.createPlaylist);
routes.put("/playlists/:playlistId", playlistController.updatePlaylist);
routes.delete("/playlists/:playlistId", playlistController.deletePlaylist);

routes.get(
  "/playlist-videos/playlist/:playlistId",
  playlistVideoController.getPlaylistVideos,
);
routes.post("/playlist-videos", playlistVideoController.addVideoToPlaylist);
routes.delete(
  "/playlist-videos/:id",
  playlistVideoController.removeVideoFromPlaylist,
);

routes.put("/settings/change-password", settingsController.changeUserPassword);

module.exports = routes;
