/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student portal endpoints
 */

/**
 * @swagger
 * /api/student/profile:
 *   get:
 *     summary: Get student profile
 *     description: Returns student profile with grade and group details
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     responses:
 *       200:
 *         description: Profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     barcode:
 *                       type: string
 *                     full_name:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     grade_name:
 *                       type: string
 *                     group_name:
 *                       type: string
 */

/**
 * @swagger
 * /api/student/stats:
 *   get:
 *     summary: Get student quick stats
 *     description: Returns attendance summary, exam averages, and payment totals
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     responses:
 *       200:
 *         description: Stats data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     attendance_percentage:
 *                       type: number
 *                     avg_exam_degree:
 *                       type: number
 *                     total_online_exams:
 *                       type: integer
 *                     total_paid:
 *                       type: number
 *                     total_fees:
 *                       type: number
 */

/**
 * @swagger
 * /api/student/attendance:
 *   get:
 *     summary: Get attendance history
 *     description: Returns paginated attendance records
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Attendance list
 */

/**
 * @swagger
 * /api/student/attendance/monthly:
 *   get:
 *     summary: Get monthly attendance stats
 *     description: Returns attendance grouped by month
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     responses:
 *       200:
 *         description: Monthly stats
 */

/**
 * @swagger
 * /api/student/attendance/consecutive-absences:
 *   get:
 *     summary: Get consecutive absences
 *     description: Returns count of consecutive absences
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     responses:
 *       200:
 *         description: Consecutive absences count
 */

/**
 * @swagger
 * /api/student/payments:
 *   get:
 *     summary: Get payment history
 *     description: Returns paginated payment records
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Payment list
 */

/**
 * @swagger
 * /api/student/payments/balance:
 *   get:
 *     summary: Get remaining balance
 *     description: Returns total required, paid, and remaining
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     responses:
 *       200:
 *         description: Balance data
 */

/**
 * @swagger
 * /api/student/payments/current-subscription:
 *   get:
 *     summary: Get current subscription
 *     description: Returns current month subscription status
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     responses:
 *       200:
 *         description: Subscription data
 */

/**
 * @swagger
 * /api/student/exams/paper:
 *   get:
 *     summary: Get paper exams
 *     description: Returns paper exams with student scores
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Paper exams list
 */

/**
 * @swagger
 * /api/student/exams/results:
 *   get:
 *     summary: Get exam results
 *     description: Returns all paper exam results
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     responses:
 *       200:
 *         description: Exam results
 */

/**
 * @swagger
 * /api/student/exams/online/available:
 *   get:
 *     summary: Get available online exams
 *     description: Returns online exams available for student grade
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Available online exams
 */

/**
 * @swagger
 * /api/student/exams/online/history:
 *   get:
 *     summary: Get online exams history
 *     description: Returns online exams taken by student
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Online exams history
 */

/**
 * @swagger
 * /api/student/exams/online/{examId}/answers:
 *   get:
 *     summary: Get exam answers
 *     description: Returns student answers for a specific online exam
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exam answers
 */

/**
 * @swagger
 * /api/student/assignments:
 *   get:
 *     summary: Get assignments
 *     description: Returns assignments with submission status
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Assignments list
 */

/**
 * @swagger
 * /api/student/assignments/submissions:
 *   get:
 *     summary: Get submissions
 *     description: Returns assignment submissions
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Submissions list
 */

/**
 * @swagger
 * /api/student/playlists:
 *   get:
 *     summary: Get playlists
 *     description: Returns active playlists for student grade
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     responses:
 *       200:
 *         description: Playlists list
 */

/**
 * @swagger
 * /api/student/playlists/{playlistId}/videos:
 *   get:
 *     summary: Get playlist videos
 *     description: Returns videos in a playlist
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Videos list
 */

/**
 * @swagger
 * /api/student/settings/change-password:
 *   put:
 *     summary: Change password
 *     tags: [Student]
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

/**
 * @swagger
 * /api/student/exams/online/{examId}/start:
 *   post:
 *     summary: Start online exam
 *     description: Start an online exam attempt and get questions
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exam started with questions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     attempt_id:
 *                       type: integer
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           question_text:
 *                             type: string
 *                           type:
 *                             type: string
 *                           options:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                 option_text:
 *                                   type: string
 */

/**
 * @swagger
 * /api/student/exams/online/{examId}/answer:
 *   post:
 *     summary: Answer exam question
 *     description: Submit an answer for a question in active exam
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [questionId, selectedOptionId]
 *             properties:
 *               questionId:
 *                 type: integer
 *               selectedOptionId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Answer saved
 */

/**
 * @swagger
 * /api/student/exams/online/{examId}/submit:
 *   post:
 *     summary: Submit online exam
 *     description: Submit and finalize the exam attempt
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exam submitted with score
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     attempt_id:
 *                       type: integer
 *                     score:
 *                       type: number
 *                     total_questions:
 *                       type: integer
 *                     correct_answers:
 *                       type: integer
 */

/**
 * @swagger
 * /api/student/assignments/{assignmentId}/submit:
 *   post:
 *     summary: Submit assignment
 *     description: Submit an assignment file
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: path
 *         name: assignmentId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [filePath]
 *             properties:
 *               filePath:
 *                 type: string
 *     responses:
 *       200:
 *         description: Assignment submitted
 */
