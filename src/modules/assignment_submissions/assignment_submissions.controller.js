const assignmentSubmissionService = require("./assignment_submissions.service");

const getSubmissionsByAssignmentId = async (req, res, next) => {
  try {
    const submissions = await assignmentSubmissionService.getSubmissionsByAssignmentId(req.params.assignmentId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: submissions,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentSubmission = async (req, res, next) => {
  try {
    const submission = await assignmentSubmissionService.getStudentSubmission(req.params.assignmentId, req.params.studentId);
    if (!submission) throw new Error("Submission Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: submission,
    });
  } catch (error) {
    next(error);
  }
};

const gradeSubmission = async (req, res, next) => {
  try {
    const { score, feedback } = req.body;
    const submission = await assignmentSubmissionService.gradeSubmission(req.params.submissionId, score, feedback, req.userId);
    if (!submission) throw new Error("Submission Not Found!");
    return res.status(200).json({
      success: true,
      message: "Submission Graded!",
      data: submission,
    });
  } catch (error) {
    next(error);
  }
};

const getAssignmentSubmissionStats = async (req, res, next) => {
  try {
    const stats = await assignmentSubmissionService.getAssignmentSubmissionStats(req.params.assignmentId);
    if (!stats) throw new Error("Assignment Not Found!");
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

const getGradeAssignmentSubmissionStats = async (req, res, next) => {
  try {
    const stats = await assignmentSubmissionService.getGradeAssignmentSubmissionStats(req.params.gradeId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

const getGroupAssignmentSubmissionStats = async (req, res, next) => {
  try {
    const stats = await assignmentSubmissionService.getGroupAssignmentSubmissionStats(req.params.groupId);
    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSubmissionsByAssignmentId,
  getStudentSubmission,
  gradeSubmission,
  getAssignmentSubmissionStats,
  getGradeAssignmentSubmissionStats,
  getGroupAssignmentSubmissionStats
};