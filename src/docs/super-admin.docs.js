/**
 * @swagger
 * tags:
 *   name: Super Admin
 *   description: Super Admin endpoints (Full Access + Extra Protection)
 */

/* ============================================
   USERS MANAGEMENT
   ============================================ */

/**
 * @swagger
 * /api/super-admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Super Admin]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *       - SuperAdminKey: []
 *     responses:
 *       200:
 *         description: Users list
 *   post:
 *     summary: Create user (Assistant/Teacher)
 *     tags: [Super Admin]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *       - SuperAdminKey: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [full_name, phone, password, role, permissions]
 *             properties:
 *               full_name: { type: string }
 *               phone: { type: string }
 *               password: { type: string }
 *               role: { type: string, enum: [super_admin, assistant, teacher] }
 *               permissions: { type: string, enum: [online_management, center_management] }
 *     responses:
 *       201:
 *         description: User created
 */

/**
 * @swagger
 * /api/super-admin/users/{userId}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Super Admin]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *       - SuperAdminKey: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: User data
 *   put:
 *     summary: Update user
 *     tags: [Super Admin]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *       - SuperAdminKey: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name: { type: string }
 *               phone: { type: string }
 *               role: { type: string, enum: [super_admin, assistant, teacher] }
 *               permissions: { type: string, enum: [online_management, center_management] }
 *     responses:
 *       200:
 *         description: User updated
 *   delete:
 *     summary: Soft delete user
 *     tags: [Super Admin]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *       - SuperAdminKey: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: User deleted
 */

/**
 * @swagger
 * /api/super-admin/users/{userId}/toggle-active:
 *   put:
 *     summary: Toggle user active status
 *     tags: [Super Admin]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *       - SuperAdminKey: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: User status toggled
 */

/* ============================================
   PLATFORM SETTINGS
   ============================================ */

/**
 * @swagger
 * /api/super-admin/settings:
 *   get:
 *     summary: Get settings
 *     tags: [Super Admin]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *       - SuperAdminKey: []
 *     responses:
 *       200:
 *         description: Settings data
 *   put:
 *     summary: Update settings
 *     tags: [Super Admin]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *       - SuperAdminKey: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               center_name: { type: string }
 *               phone: { type: string }
 *               address: { type: string }
 *               default_lock_minutes: { type: integer }
 *               academic_year_status: { type: string, enum: [active, paused, ended] }
 *               platform_status: { type: string, enum: [active, paused] }
 *     responses:
 *       200:
 *         description: Settings updated
 */

/**
 * @swagger
 * /api/super-admin/settings/toggle-platform:
 *   put:
 *     summary: Toggle platform status (active/paused)
 *     tags: [Super Admin]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *       - SuperAdminKey: []
 *     responses:
 *       200:
 *         description: Platform status toggled
 */

/* ============================================
   WHATSAPP TEMPLATES
   ============================================ */

/**
 * @swagger
 * /api/super-admin/whatsapp-messages:
 *   get:
 *     summary: Get all whatsapp templates
 *     tags: [Super Admin]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *       - SuperAdminKey: []
 *     responses:
 *       200:
 *         description: Templates list
 *   post:
 *     summary: Create whatsapp template
 *     tags: [Super Admin]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *       - SuperAdminKey: []
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
 *     responses:
 *       201:
 *         description: Template created
 */

/* ============================================
   FULL CRUD (Same as Assistant)
   ============================================ */

/**
 * @swagger
 * /api/super-admin/grades:
 *   get:
 *     summary: Get all grades
 *     tags: [Super Admin]
 *     security: [{ ApiAuth: [], ClientToken: [], SuperAdminKey: [] }]
 *     responses: { 200: { description: Grades list } }
 *   post:
 *     summary: Create grade
 *     tags: [Super Admin]
 *     security: [{ ApiAuth: [], ClientToken: [], SuperAdminKey: [] }]
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
 * /api/super-admin/groups:
 *   get:
 *     summary: Get all groups
 *     tags: [Super Admin]
 *     security: [{ ApiAuth: [], ClientToken: [], SuperAdminKey: [] }]
 *     responses: { 200: { description: Groups list } }
 *   post:
 *     summary: Create group
 *     tags: [Super Admin]
 *     security: [{ ApiAuth: [], ClientToken: [], SuperAdminKey: [] }]
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
 * /api/super-admin/students:
 *   get:
 *     summary: Get all students
 *     tags: [Super Admin]
 *     security: [{ ApiAuth: [], ClientToken: [], SuperAdminKey: [] }]
 *     responses: { 200: { description: Students list } }
 *   post:
 *     summary: Create student
 *     tags: [Super Admin]
 *     security: [{ ApiAuth: [], ClientToken: [], SuperAdminKey: [] }]
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
 * /api/super-admin/attendance:
 *   post:
 *     summary: Create attendance
 *     tags: [Super Admin]
 *     security: [{ ApiAuth: [], ClientToken: [], SuperAdminKey: [] }]
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
 *     responses: { 201: { description: Attendance created } }
 *
 * /api/super-admin/payments:
 *   post:
 *     summary: Create payment
 *     tags: [Super Admin]
 *     security: [{ ApiAuth: [], ClientToken: [], SuperAdminKey: [] }]
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
 *
 * /api/super-admin/subscriptions:
 *   post:
 *     summary: Create subscription
 *     tags: [Super Admin]
 *     security: [{ ApiAuth: [], ClientToken: [], SuperAdminKey: [] }]
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
 *
 * /api/super-admin/exams:
 *   post:
 *     summary: Create paper exam
 *     tags: [Super Admin]
 *     security: [{ ApiAuth: [], ClientToken: [], SuperAdminKey: [] }]
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
 *
 * /api/super-admin/online-exams:
 *   post:
 *     summary: Create online exam
 *     tags: [Super Admin]
 *     security: [{ ApiAuth: [], ClientToken: [], SuperAdminKey: [] }]
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
 *
 * /api/super-admin/videos:
 *   post:
 *     summary: Create video
 *     tags: [Super Admin]
 *     security: [{ ApiAuth: [], ClientToken: [], SuperAdminKey: [] }]
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
 *
 * /api/super-admin/playlists:
 *   post:
 *     summary: Create playlist
 *     tags: [Super Admin]
 *     security: [{ ApiAuth: [], ClientToken: [], SuperAdminKey: [] }]
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