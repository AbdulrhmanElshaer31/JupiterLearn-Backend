const parentService = require("./parent.service");

const getParentDashboard = async (req, res, next) => {
  try {
    const token = req.params.token;
    const student = await parentService.getStudentByParentToken(token);
    if (!student) throw new Error("Invalid parent token!");

    const studentId = student.id;

    const attendance = await parentService.getParentDashboardAttendance(studentId);
    const lastAbsences = await parentService.getLastFiveAbsences(studentId);
    const payments = await parentService.getParentDashboardPayments(studentId);
    const lastPayment = await parentService.getLastPayment(studentId);
    const paperExams = await parentService.getLastFivePaperExams(studentId);
    const onlineExams = await parentService.getLastFiveOnlineExams(studentId);
    const assignments = await parentService.getParentDashboardAssignments(studentId);
    const groupInfo = await parentService.getGroupInfo(studentId);

    return res.status(200).json({
      success: true,
      message: "Data Loaded!",
      data: {
        student,
        attendance,
        lastAbsences,
        payments,
        lastPayment,
        paperExams,
        onlineExams,
        assignments,
        groupInfo
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getParentDashboard
};