/**
 * @swagger
 * tags:
 *   name: Assistant
 *   description: Assistant management endpoints (Read + Write)
 */

/**
 * @swagger
 * /api/assistant/grades:
 *   get:
 *     summary: Get all grades
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Grades list } }
 *
 * /api/assistant/grades/active:
 *   get:
 *     summary: Get active grades
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Active grades list } }
 *
 * /api/assistant/grades/inactive:
 *   get:
 *     summary: Get inactive grades
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Inactive grades list } }
 *
 * /api/assistant/grades/stats/all:
 *   get:
 *     summary: Get all grades stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: All grades stats } }
 *
 * /api/assistant/grades/{gradeId}:
 *   get:
 *     summary: Get grade by ID
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Grade data } }
 *
 * /api/assistant/grades/{gradeId}/stats:
 *   get:
 *     summary: Get grade stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Grade stats } }
 */

// Groups
/**
 * @swagger
 * /api/assistant/groups:
 *   get:
 *     summary: Get all groups
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Groups list } }
 *
 * /api/assistant/groups/stats/all:
 *   get:
 *     summary: Get all groups stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: All groups stats } }
 *
 * /api/assistant/groups/grade/{gradeId}:
 *   get:
 *     summary: Get groups by grade
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Groups list } }
 *
 * /api/assistant/groups/{groupId}:
 *   get:
 *     summary: Get group by ID
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Group data } }
 *
 * /api/assistant/groups/{groupId}/stats:
 *   get:
 *     summary: Get group stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Group stats } }
 */

// Students
/**
 * @swagger
 * /api/assistant/students:
 *   get:
 *     summary: Get all students
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Students list } }
 *
 * /api/assistant/students/search:
 *   get:
 *     summary: Search student by barcode
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: query
 *         name: barcode
 *         required: true
 *         schema: { type: string }
 *     responses: { 200: { description: Student data } }
 *
 * /api/assistant/students/{studentId}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Student data } }
 *
 * /api/assistant/students/{studentId}/profile:
 *   get:
 *     summary: Get student profile
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Student profile } }
 *
 * /api/assistant/students/{studentId}/stats:
 *   get:
 *     summary: Get student stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Student stats } }
 */

// Attendance
/**
 * @swagger
 * /api/assistant/attendance/overall:
 *   get:
 *     summary: Get overall attendance stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Overall attendance stats } }
 *
 * /api/assistant/attendance/consecutive-absences:
 *   get:
 *     summary: Get students with 3 consecutive absences
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Students list } }
 *
 * /api/assistant/attendance/grade/{gradeId}/stats:
 *   get:
 *     summary: Get grade attendance stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Grade attendance stats } }
 *
 * /api/assistant/attendance/group/{groupId}/date/{date}:
 *   get:
 *     summary: Get group attendance by date
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema: { type: integer }
 *       - in: path
 *         name: date
 *         required: true
 *         schema: { type: string }
 *     responses: { 200: { description: Attendance records } }
 *
 * /api/assistant/attendance/group/{groupId}/month/{month}:
 *   get:
 *     summary: Get group attendance by month
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema: { type: integer }
 *       - in: path
 *         name: month
 *         required: true
 *         schema: { type: string }
 *     responses: { 200: { description: Attendance records } }
 */

// Payments
/**
 * @swagger
 * /api/assistant/payments/collections:
 *   get:
 *     summary: Get monthly collections
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Monthly collections } }
 *
 * /api/assistant/payments/unpaid:
 *   get:
 *     summary: Get unpaid students current month
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Unpaid students } }
 *
 * /api/assistant/payments/overall:
 *   get:
 *     summary: Get overall payment stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Overall payment stats } }
 *
 * /api/assistant/payments/grade/{gradeId}/stats:
 *   get:
 *     summary: Get grade payment stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Grade payment stats } }
 *
 * /api/assistant/payments/group/{groupId}/stats:
 *   get:
 *     summary: Get group payment stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Group payment stats } }
 *
 * /api/assistant/payments/grade/{gradeId}/month/{month}:
 *   get:
 *     summary: Get grade payments by month
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *       - in: path
 *         name: month
 *         required: true
 *         schema: { type: string }
 *     responses: { 200: { description: Payment records } }
 *
 * /api/assistant/payments/group/{groupId}/month/{month}:
 *   get:
 *     summary: Get group payments by month
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema: { type: integer }
 *       - in: path
 *         name: month
 *         required: true
 *         schema: { type: string }
 *     responses: { 200: { description: Payment records } }
 */

// Subscriptions
/**
 * @swagger
 * /api/assistant/subscriptions/student/{studentId}:
 *   get:
 *     summary: Get student subscriptions
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Student subscriptions } }
 *
 * /api/assistant/subscriptions/month/{month}:
 *   get:
 *     summary: Get subscriptions by month
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: month
 *         required: true
 *         schema: { type: string }
 *     responses: { 200: { description: Month subscriptions } }
 *
 * /api/assistant/subscriptions/without-current:
 *   get:
 *     summary: Get students without current subscription
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Students list } }
 *
 * /api/assistant/subscriptions/grade/{gradeId}/stats:
 *   get:
 *     summary: Get grade subscription stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Grade subscription stats } }
 *
 * /api/assistant/subscriptions/group/{groupId}/stats:
 *   get:
 *     summary: Get group subscription stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Group subscription stats } }
 *
 * /api/assistant/subscriptions/overall:
 *   get:
 *     summary: Get overall subscription stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Overall subscription stats } }
 */

// Paper Exams
/**
 * @swagger
 * /api/assistant/exams:
 *   get:
 *     summary: Get all exams
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Exams list } }
 *
 * /api/assistant/exams/{examId}:
 *   get:
 *     summary: Get exam by ID
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Exam data } }
 *
 * /api/assistant/exams/grade/{gradeId}:
 *   get:
 *     summary: Get exams by grade
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Exams list } }
 *
 * /api/assistant/exams/group/{groupId}:
 *   get:
 *     summary: Get exams by group
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Exams list } }
 *
 * /api/assistant/exams/{examId}/stats:
 *   get:
 *     summary: Get exam stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Exam stats } }
 *
 * /api/assistant/exams/grade/{gradeId}/stats:
 *   get:
 *     summary: Get grade exam stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Grade exam stats } }
 */

// Exam Results
/**
 * @swagger
 * /api/assistant/exam-results/{examId}:
 *   get:
 *     summary: Get exam results
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Exam results } }
 *
 * /api/assistant/exam-results/{examId}/stats:
 *   get:
 *     summary: Get exam result stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Exam result stats } }
 *
 * /api/assistant/exam-results/grade/{gradeId}/stats:
 *   get:
 *     summary: Get grade exam results stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Grade exam results } }
 *
 * /api/assistant/exam-results/group/{groupId}/stats:
 *   get:
 *     summary: Get group exam results stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Group exam results } }
 */

// Online Exams
/**
 * @swagger
 * /api/assistant/online-exams:
 *   get:
 *     summary: Get all online exams
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Online exams list } }
 *   post:
 *     summary: Create online exam
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, gradeId, durationMinutes, startAt, endAt, fullMark]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               gradeId: { type: integer }
 *               groupId: { type: integer }
 *               durationMinutes: { type: integer }
 *               startAt: { type: string, format: date-time }
 *               endAt: { type: string, format: date-time }
 *               fullMark: { type: number }
 *               randomizeQuestions: { type: integer, enum: [0, 1] }
 *     responses: { 201: { description: Exam created } }
 *
 * /api/assistant/online-exams/{examId}:
 *   get:
 *     summary: Get online exam by ID
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Online exam data } }
 *   put:
 *     summary: Update online exam
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               gradeId: { type: integer }
 *               groupId: { type: integer }
 *               durationMinutes: { type: integer }
 *               startAt: { type: string, format: date-time }
 *               endAt: { type: string, format: date-time }
 *               fullMark: { type: number }
 *               randomizeQuestions: { type: integer, enum: [0, 1] }
 *     responses: { 200: { description: Exam updated } }
 *   delete:
 *     summary: Delete online exam
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Exam deleted } }
 *
 * /api/assistant/online-exams/grade/{gradeId}:
 *   get:
 *     summary: Get online exams by grade
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Online exams list } }
 *
 * /api/assistant/online-exams/group/{groupId}:
 *   get:
 *     summary: Get online exams by group
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Online exams list } }
 *
 * /api/assistant/online-exams/stats/{examId}:
 *   get:
 *     summary: Get online exam stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Online exam stats } }
 *
 * /api/assistant/online-exams/stats/grade/{gradeId}:
 *   get:
 *     summary: Get grade online exam stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Grade online exam stats } }
 */

// Questions
/**
 * @swagger
 * /api/assistant/questions/exam/{examId}:
 *   get:
 *     summary: Get questions by exam
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Questions list } }
 *
 * /api/assistant/questions/{questionId}:
 *   get:
 *     summary: Get question by ID
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Question data } }
 *   put:
 *     summary: Update question
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionText: { type: string }
 *               type: { type: string, enum: [mcq, true_false, essay] }
 *               order: { type: integer }
 *     responses: { 200: { description: Question updated } }
 *   delete:
 *     summary: Delete question
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Question deleted } }
 *
 * /api/assistant/questions:
 *   post:
 *     summary: Create question
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [examId, questionText, type, order]
 *             properties:
 *               examId: { type: integer }
 *               questionText: { type: string }
 *               type: { type: string, enum: [mcq, true_false, essay] }
 *               order: { type: integer }
 *     responses: { 201: { description: Question created } }
 */

// Options
/**
 * @swagger
 * /api/assistant/options/question/{questionId}:
 *   get:
 *     summary: Get options by question
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Options list } }
 *
 * /api/assistant/options/{optionId}:
 *   get:
 *     summary: Get option by ID
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: optionId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Option data } }
 *   put:
 *     summary: Update option
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: optionId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               optionText: { type: string }
 *               isCorrect: { type: integer, enum: [0, 1] }
 *               order: { type: integer }
 *     responses: { 200: { description: Option updated } }
 *   delete:
 *     summary: Delete option
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: optionId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Option deleted } }
 *
 * /api/assistant/options:
 *   post:
 *     summary: Create option
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [questionId, optionText, isCorrect, order]
 *             properties:
 *               questionId: { type: integer }
 *               optionText: { type: string }
 *               isCorrect: { type: integer, enum: [0, 1] }
 *               order: { type: integer }
 *     responses: { 201: { description: Option created } }
 */

// Student Exams
/**
 * @swagger
 * /api/assistant/student-exams/{examId}:
 *   get:
 *     summary: Get student exams by exam
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Student exams list } }
 *
 * /api/assistant/student-exams/{examId}/stats:
 *   get:
 *     summary: Get exam attempt stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Exam attempt stats } }
 *
 * /api/assistant/student-exams/grade/{gradeId}/stats:
 *   get:
 *     summary: Get grade exam attempts stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Grade exam attempts stats } }
 *
 * /api/assistant/student-exams/group/{groupId}/stats:
 *   get:
 *     summary: Get group exam attempts stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Group exam attempts stats } }
 */

// Student Answers
/**
 * @swagger
 * /api/assistant/student-answers/question/{questionId}/stats:
 *   get:
 *     summary: Get question answer stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Question stats } }
 *
 * /api/assistant/student-answers/question/{questionId}/options:
 *   get:
 *     summary: Get most selected options
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Options list } }
 */

// Assignments
/**
 * @swagger
 * /api/assistant/assignments:
 *   get:
 *     summary: Get all assignments
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Assignments list } }
 *   post:
 *     summary: Create assignment
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, gradeId, fullMark, deadline]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               gradeId: { type: integer }
 *               groupId: { type: integer }
 *               filePath: { type: string }
 *               fullMark: { type: number }
 *               deadline: { type: string, format: date-time }
 *     responses: { 201: { description: Assignment created } }
 *
 * /api/assistant/assignments/{assignmentId}:
 *   get:
 *     summary: Get assignment by ID
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Assignment data } }
 *   put:
 *     summary: Update assignment
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               gradeId: { type: integer }
 *               groupId: { type: integer }
 *               filePath: { type: string }
 *               fullMark: { type: number }
 *               deadline: { type: string, format: date-time }
 *               isClosed: { type: integer, enum: [0, 1] }
 *     responses: { 200: { description: Assignment updated } }
 *   delete:
 *     summary: Delete assignment
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Assignment deleted } }
 *
 * /api/assistant/assignments/grade/{gradeId}:
 *   get:
 *     summary: Get assignments by grade
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Assignments list } }
 *
 * /api/assistant/assignments/group/{groupId}:
 *   get:
 *     summary: Get assignments by group
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Assignments list } }
 */

// Assignment Submissions
/**
 * @swagger
 * /api/assistant/assignment-submissions/assignment/{assignmentId}:
 *   get:
 *     summary: Get submissions by assignment
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Submissions list } }
 *
 * /api/assistant/assignment-submissions/assignment/{assignmentId}/student/{studentId}:
 *   get:
 *     summary: Get student submission
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Student submission } }
 *
 * /api/assistant/assignment-submissions/{submissionId}/grade:
 *   put:
 *     summary: Grade submission
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: submissionId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [score]
 *             properties:
 *               score: { type: number }
 *               feedback: { type: string }
 *     responses: { 200: { description: Submission graded } }
 *
 * /api/assistant/assignment-submissions/stats/assignment/{assignmentId}:
 *   get:
 *     summary: Get assignment submission stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Submission stats } }
 *
 * /api/assistant/assignment-submissions/stats/grade/{gradeId}:
 *   get:
 *     summary: Get grade submission stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Grade submission stats } }
 *
 * /api/assistant/assignment-submissions/stats/group/{groupId}:
 *   get:
 *     summary: Get group submission stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Group submission stats } }
 */

// Videos
/**
 * @swagger
 * /api/assistant/videos:
 *   get:
 *     summary: Get all videos
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Videos list } }
 *   post:
 *     summary: Create video
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, gradeId, youtubeUrl]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               gradeId: { type: integer }
 *               youtubeUrl: { type: string }
 *     responses: { 201: { description: Video created } }
 *
 * /api/assistant/videos/active:
 *   get:
 *     summary: Get active videos
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Active videos } }
 *
 * /api/assistant/videos/inactive:
 *   get:
 *     summary: Get inactive videos
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Inactive videos } }
 *
 * /api/assistant/videos/grade/{gradeId}:
 *   get:
 *     summary: Get videos by grade
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Videos list } }
 *
 * /api/assistant/videos/{videoId}:
 *   get:
 *     summary: Get video by ID
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Video data } }
 *   put:
 *     summary: Update video
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               gradeId: { type: integer }
 *               youtubeUrl: { type: string }
 *               isActive: { type: integer, enum: [0, 1] }
 *     responses: { 200: { description: Video updated } }
 *   delete:
 *     summary: Delete video
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Video deleted } }
 */

// Playlists
/**
 * @swagger
 * /api/assistant/playlists:
 *   get:
 *     summary: Get all playlists
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Playlists list } }
 *   post:
 *     summary: Create playlist
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, gradeId]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               gradeId: { type: integer }
 *     responses: { 201: { description: Playlist created } }
 *
 * /api/assistant/playlists/active:
 *   get:
 *     summary: Get active playlists
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Active playlists } }
 *
 * /api/assistant/playlists/inactive:
 *   get:
 *     summary: Get inactive playlists
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Inactive playlists } }
 *
 * /api/assistant/playlists/grade/{gradeId}:
 *   get:
 *     summary: Get playlists by grade
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Playlists list } }
 *
 * /api/assistant/playlists/{playlistId}:
 *   get:
 *     summary: Get playlist by ID
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Playlist data } }
 *   put:
 *     summary: Update playlist
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               gradeId: { type: integer }
 *               isActive: { type: integer, enum: [0, 1] }
 *     responses: { 200: { description: Playlist updated } }
 *   delete:
 *     summary: Delete playlist
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Playlist deleted } }
 *
 * /api/assistant/playlists/stats/{playlistId}:
 *   get:
 *     summary: Get playlist stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Playlist stats } }
 *
 * /api/assistant/playlists/stats/grade/{gradeId}:
 *   get:
 *     summary: Get grade playlists stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Grade playlists stats } }
 */

// Playlist Videos
/**
 * @swagger
 * /api/assistant/playlist-videos/playlist/{playlistId}:
 *   get:
 *     summary: Get playlist videos
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Videos list } }
 *
 * /api/assistant/playlist-videos:
 *   post:
 *     summary: Add video to playlist
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [playlistId, videoId]
 *             properties:
 *               playlistId: { type: integer }
 *               videoId: { type: integer }
 *     responses: { 201: { description: Video added } }
 *
 * /api/assistant/playlist-videos/{id}:
 *   delete:
 *     summary: Remove video from playlist
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Video removed } }
 */

// Settings
/**
 * @swagger
 * /api/assistant/settings/change-password:
 *   put:
 *     summary: Change password
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [oldPassword, newPassword, confirmPassword]
 *             properties:
 *               oldPassword: { type: string }
 *               newPassword: { type: string }
 *               confirmPassword: { type: string }
 *     responses: { 200: { description: Password changed } }
 */
