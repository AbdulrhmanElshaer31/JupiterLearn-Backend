const express = require("express");
const routes = express.Router();
const stdController = require("./students.controller");
const settingsController = require("../settings/settings.controller");

routes.get("/profile", stdController.getStudentProfile);
routes.get("/stats", stdController.getStudentQuickStats);
routes.get("/attendance", stdController.getAttendanceHistory);
routes.get("/attendance/monthly", stdController.getMonthlyAttendanceStats);
routes.get(
  "/attendance/consecutive-absences",
  stdController.getConsecutiveAbsences,
);
routes.get("/payments", stdController.getPaymentHistory);
routes.get("/payments/balance", stdController.getRemainingBalance);
routes.get(
  "/payments/current-subscription",
  stdController.getCurrentSubscription,
);
routes.get("/exams/paper", stdController.getStudentPaperExams);
routes.get("/exams/results", stdController.getStudentExamResults);
routes.get("/exams/online/available", stdController.getAvailableOnlineExams);
routes.get("/exams/online/history", stdController.getStudentOnlineExams);
routes.get(
  "/exams/online/:examId/answers",
  stdController.getStudentExamAnswers,
);
routes.get("/assignments", stdController.getStudentAssignments);
routes.get("/assignments/submissions", stdController.getStudentSubmissions);
routes.get("/playlists", stdController.getStudentPlaylists);
routes.get("/playlists/:playlistId/videos", stdController.getPlaylistVideos);
routes.put(
  "/settings/change-password",
  settingsController.changeStudentPassword,
);

module.exports = routes;
