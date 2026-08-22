/**
 * @swagger
 * tags:
 *   name: Assistant
 *   description: Assistant management endpoints (Center + Online Management)
 */

/* ============================================
   GRADES
   ============================================ */

/**
 * @swagger
 * /api/assistant/grades:
 *   get:
 *     summary: Get all grades
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Grades list } }
 *   post:
 *     summary: Create grade
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, monthlyPrice]
 *             properties:
 *               name: { type: string }
 *               monthlyPrice: { type: number }
 *     responses: { 201: { description: Grade created } }
 *
 * /api/assistant/grades/{id}:
 *   get:
 *     summary: Get grade by ID
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Grade data } }
 *   put:
 *     summary: Update grade
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, monthlyPrice]
 *             properties:
 *               name: { type: string }
 *               monthlyPrice: { type: number }
 *     responses: { 200: { description: Grade updated } }
 *   delete:
 *     summary: Soft delete grade
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Grade deleted } }
 *
 * /api/assistant/grades/{id}/stats:
 *   get:
 *     summary: Get grade stats
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Grade stats } }
 *
 * /api/assistant/grades/{id}/permanent:
 *   delete:
 *     summary: Hard delete grade
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Grade permanently deleted } }
 */

/* ============================================
   GROUPS
   ============================================ */

/**
 * @swagger
 * /api/assistant/groups:
 *   get:
 *     summary: Get all groups
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Groups list } }
 *   post:
 *     summary: Create group
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, grade_id, days, start_time, end_time]
 *             properties:
 *               name: { type: string }
 *               grade_id: { type: integer }
 *               days: { type: string }
 *               start_time: { type: string }
 *               end_time: { type: string }
 *               room: { type: string }
 *     responses: { 201: { description: Group created } }
 *
 * /api/assistant/groups/{id}:
 *   get:
 *     summary: Get group by ID
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Group data } }
 *   put:
 *     summary: Update group
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, days, start_time, end_time]
 *             properties:
 *               name: { type: string }
 *               days: { type: string }
 *               start_time: { type: string }
 *               end_time: { type: string }
 *               room: { type: string }
 *     responses: { 200: { description: Group updated } }
 *   delete:
 *     summary: Soft delete group
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Group deleted } }
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
 */

/* ============================================
   STUDENTS
   ============================================ */

/**
 * @swagger
 * /api/assistant/students:
 *   get:
 *     summary: Get all students
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: grade_id
 *         schema: { type: integer }
 *       - in: query
 *         name: group_id
 *         schema: { type: integer }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *     responses: { 200: { description: Students list } }
 *   post:
 *     summary: Create student
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [barcode, full_name, parent_token, grade_id, group_id]
 *             properties:
 *               barcode: { type: string }
 *               full_name: { type: string }
 *               phone: { type: string }
 *               parent_phone: { type: string }
 *               parent_token: { type: string }
 *               grade_id: { type: integer }
 *               group_id: { type: integer }
 *               notes: { type: string }
 *     responses: { 201: { description: Student created } }
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
 *   put:
 *     summary: Update student
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               barcode: { type: string }
 *               full_name: { type: string }
 *               phone: { type: string }
 *               parent_phone: { type: string }
 *               grade_id: { type: integer }
 *               group_id: { type: integer }
 *               notes: { type: string }
 *     responses: { 200: { description: Student updated } }
 *   delete:
 *     summary: Soft delete student
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Student deleted } }
 */

/* ============================================
   ATTENDANCE
   ============================================ */

/**
 * @swagger
 * /api/assistant/attendance:
 *   post:
 *     summary: Create attendance
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [student_id, group_id, grade_id, attendance_date, status]
 *             properties:
 *               student_id: { type: integer }
 *               group_id: { type: integer }
 *               grade_id: { type: integer }
 *               attendance_date: { type: string, format: date }
 *               status: { type: string, enum: [present, absent] }
 *               attendance_time: { type: string }
 *               method: { type: string, enum: [manual, barcode] }
 *               is_makeup: { type: integer, enum: [0, 1] }
 *               makeup_group_id: { type: integer }
 *               notes: { type: string }
 *     responses: { 201: { description: Attendance created } }
 *
 * /api/assistant/attendance/mark-rest-absent:
 *   post:
 *     summary: Mark rest as absent
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [groupId, date]
 *             properties:
 *               groupId: { type: integer }
 *               date: { type: string, format: date }
 *     responses: { 200: { description: Rest marked as absent } }
 *
 * /api/assistant/attendance/{id}:
 *   put:
 *     summary: Update attendance
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: string, enum: [present, absent] }
 *               notes: { type: string }
 *     responses: { 200: { description: Attendance updated } }
 *   delete:
 *     summary: Delete attendance
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Attendance deleted } }
 */

/* ============================================
   PAYMENTS
   ============================================ */

/**
 * @swagger
 * /api/assistant/payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Payments list } }
 *   post:
 *     summary: Create payment
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [subscription_id, student_id, amount]
 *             properties:
 *               subscription_id: { type: integer }
 *               student_id: { type: integer }
 *               amount: { type: number }
 *               payment_date: { type: string, format: date-time }
 *               notes: { type: string }
 *     responses: { 201: { description: Payment created } }
 */

/* ============================================
   SUBSCRIPTIONS
   ============================================ */

/**
 * @swagger
 * /api/assistant/subscriptions:
 *   post:
 *     summary: Create subscription
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [student_id, month, required_amount]
 *             properties:
 *               student_id: { type: integer }
 *               month: { type: string, example: "2026-08" }
 *               required_amount: { type: number }
 *     responses: { 201: { description: Subscription created } }
 */

/* ============================================
   EXAMS
   ============================================ */

/**
 * @swagger
 * /api/assistant/exams:
 *   get:
 *     summary: Get all exams
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Exams list } }
 *   post:
 *     summary: Create paper exam
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, grade_id, total_degree, exam_date]
 *             properties:
 *               title: { type: string }
 *               grade_id: { type: integer }
 *               group_id: { type: integer }
 *               total_degree: { type: number }
 *               exam_date: { type: string, format: date }
 *               notes: { type: string }
 *     responses: { 201: { description: Exam created } }
 */

/* ============================================
   ONLINE EXAMS
   ============================================ */

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
 *             required: [title, grade_id, duration_minutes, start_at, end_at, full_mark]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               grade_id: { type: integer }
 *               group_id: { type: integer }
 *               duration_minutes: { type: integer }
 *               start_at: { type: string, format: date-time }
 *               end_at: { type: string, format: date-time }
 *               full_mark: { type: number }
 *               randomize_questions: { type: integer, enum: [0, 1] }
 *     responses: { 201: { description: Online exam created } }
 */

/* ============================================
   QUESTIONS
   ============================================ */

/**
 * @swagger
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
 *             required: [exam_id, question_text, type, order]
 *             properties:
 *               exam_id: { type: integer }
 *               question_text: { type: string }
 *               type: { type: string, enum: [mcq, true_false, essay] }
 *               order: { type: integer }
 *     responses: { 201: { description: Question created } }
 */

/* ============================================
   OPTIONS
   ============================================ */

/**
 * @swagger
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
 *             required: [question_id, option_text, is_correct, order]
 *             properties:
 *               question_id: { type: integer }
 *               option_text: { type: string }
 *               is_correct: { type: integer, enum: [0, 1] }
 *               order: { type: integer }
 *     responses: { 201: { description: Option created } }
 */

/* ============================================
   ASSIGNMENTS
   ============================================ */

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
 *             required: [title, grade_id, full_mark, deadline]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               grade_id: { type: integer }
 *               group_id: { type: integer }
 *               full_mark: { type: number }
 *               deadline: { type: string, format: date-time }
 *     responses: { 201: { description: Assignment created } }
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
 */

/* ============================================
   VIDEOS
   ============================================ */

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
 *             required: [title, grade_id, video_url]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               grade_id: { type: integer }
 *               video_url: { type: string }
 *     responses: { 201: { description: Video created } }
 */

/* ============================================
   PLAYLISTS
   ============================================ */

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
 *             required: [title, grade_id]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               grade_id: { type: integer }
 *     responses: { 201: { description: Playlist created } }
 */

/* ============================================
   WHATSAPP TEMPLATES
   ============================================ */

/**
 * @swagger
 * /api/assistant/whatsapp-messages:
 *   get:
 *     summary: Get all whatsapp templates
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Templates list } }
 *   post:
 *     summary: Create whatsapp template
 *     tags: [Assistant]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [template, sent_to]
 *             properties:
 *               template: { type: string }
 *               sent_to: { type: string, enum: [students, parents, both] }
 *               delay: { type: integer, default: 60 }
 *     responses: { 201: { description: Template created } }
 */
