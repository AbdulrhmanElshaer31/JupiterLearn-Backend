/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: Teacher dashboard endpoints (Read Only)
 */

/**
 * @swagger
 * /api/teacher/grades:
 *   get:
 *     summary: Get all grades
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Grades list } }
 * 
 * /api/teacher/students:
 *   get:
 *     summary: Get all students
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Students list } }
 * 
 * /api/teacher/students/search:
 *   get:
 *     summary: Search student by barcode
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: query
 *         name: barcode
 *         required: true
 *         schema: { type: string }
 *     responses: { 200: { description: Student data } }
 * 
 * /api/teacher/attendance/overall:
 *   get:
 *     summary: Get overall attendance stats
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Overall attendance stats } }
 * 
 * /api/teacher/payments/overall:
 *   get:
 *     summary: Get overall payment stats
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Overall payment stats } }
 * 
 * /api/teacher/payments/collections:
 *   get:
 *     summary: Get monthly collections
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Monthly collections } }
 * 
 * /api/teacher/payments/unpaid:
 *   get:
 *     summary: Get unpaid students
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Unpaid students } }
 * 
 * /api/teacher/exams:
 *   get:
 *     summary: Get all exams
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Exams list } }
 * 
 * /api/teacher/online-exams:
 *   get:
 *     summary: Get all online exams
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Online exams list } }
 * 
 * /api/teacher/videos:
 *   get:
 *     summary: Get all videos
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Videos list } }
 * 
 * /api/teacher/playlists:
 *   get:
 *     summary: Get all playlists
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Playlists list } }
 * 
 * /api/teacher/assignments:
 *   get:
 *     summary: Get all assignments
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Assignments list } }
 * 
 * /api/teacher/settings/change-password:
 *   put:
 *     summary: Change password
 *     tags: [Teacher]
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