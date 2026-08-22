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
 * /api/teacher/groups:
 *   get:
 *     summary: Get all groups
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Groups list } }
 *
 * /api/teacher/students:
 *   get:
 *     summary: Get all students
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Students list } }
 *
 * /api/teacher/attendance/overall-stats:
 *   get:
 *     summary: Get overall attendance stats
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Overall attendance stats } }
 *
 * /api/teacher/payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Payments list } }
 *
 * /api/teacher/subscriptions/overall:
 *   get:
 *     summary: Get overall subscription stats
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Subscription stats } }
 *
 * /api/teacher/exams:
 *   get:
 *     summary: Get all exams
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Exams list } }
 *
 * /api/teacher/exam-results/exam/{examId}:
 *   get:
 *     summary: Get exam results
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Exam results } }
 *
 * /api/teacher/online-exams:
 *   get:
 *     summary: Get all online exams
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Online exams list } }
 *
 * /api/teacher/student-exams/exam/{examId}/stats:
 *   get:
 *     summary: Get exam attempt stats
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     parameters:
 *       - in: path
 *         name: examId
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: Exam attempt stats } }
 *
 * /api/teacher/assignments:
 *   get:
 *     summary: Get all assignments
 *     tags: [Teacher]
 *     security: [{ ApiAuth: [], ClientToken: [] }]
 *     responses: { 200: { description: Assignments list } }
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
 */
