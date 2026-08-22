/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student portal endpoints - All student operations
 */

/* ============================================
   PART 1: CRUD & SEARCH ENDPOINTS
   ============================================ */

/**
 * @swagger
 * /api/student:
 *   post:
 *     summary: Create a new student
 *     description: Create new student (Assistant/Super Admin only)
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [barcode, full_name, parent_token, grade_id, group_id]
 *             properties:
 *               barcode:
 *                 type: string
 *               full_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               parent_phone:
 *                 type: string
 *               parent_token:
 *                 type: string
 *               grade_id:
 *                 type: integer
 *               group_id:
 *                 type: integer
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student created
 *   get:
 *     summary: Get all students
 *     description: Returns paginated students with filters
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name, barcode, or phone
 *       - in: query
 *         name: grade_id
 *         schema:
 *           type: integer
 *         description: Filter by grade
 *       - in: query
 *         name: group_id
 *         schema:
 *           type: integer
 *         description: Filter by group
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       200:
 *         description: Students list with pagination
 */

/**
 * @swagger
 * /api/student/deleted:
 *   get:
 *     summary: Get deleted students
 *     description: Returns all soft-deleted students
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
 *     responses:
 *       200:
 *         description: Deleted students list
 */

/**
 * @swagger
 * /api/student/search/barcode:
 *   get:
 *     summary: Search student by barcode
 *     description: Find a student by their barcode
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: query
 *         name: barcode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student found
 */

/**
 * @swagger
 * /api/student/search/phone:
 *   get:
 *     summary: Search student by phone
 *     description: Find a student by their phone number
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: query
 *         name: phone
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student found
 */

/**
 * @swagger
 * /api/student/search/parent-phone:
 *   get:
 *     summary: Search students by parent phone
 *     description: Find students by their parent's phone number
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: query
 *         name: parent_phone
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Students found
 */

/**
 * @swagger
 * /api/student/grade/{gradeId}:
 *   get:
 *     summary: Get students by grade
 *     description: Returns all students in a specific grade
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: path
 *         name: gradeId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Students list
 */

/**
 * @swagger
 * /api/student/group/{groupId}:
 *   get:
 *     summary: Get students by group
 *     description: Returns all students in a specific group
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Students list
 */

/**
 * @swagger
 * /api/student/{studentId}:
 *   get:
 *     summary: Get student by ID
 *     description: Returns single student details
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Student data
 *   put:
 *     summary: Update student
 *     description: Update student full information (Assistant/Super Admin only)
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               barcode:
 *                 type: string
 *               full_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               parent_phone:
 *                 type: string
 *               grade_id:
 *                 type: integer
 *               group_id:
 *                 type: integer
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated
 *   delete:
 *     summary: Soft delete student
 *     description: Soft delete a student (set deleted = 1)
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Student deleted
 */

/**
 * @swagger
 * /api/student/{studentId}/permanent:
 *   delete:
 *     summary: Hard delete student
 *     description: Permanently delete a student (Super Admin only)
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Student permanently deleted
 */

/**
 * @swagger
 * /api/student/{studentId}/restore:
 *   post:
 *     summary: Restore student
 *     description: Restore a soft-deleted student (Super Admin only)
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Student restored
 */

/* ============================================
   PART 2: PROFILE & STATISTICS ENDPOINTS
   ============================================ */

/**
 * @swagger
 * /api/student/profile:
 *   get:
 *     summary: Get student profile
 *     description: Returns full student profile with grade and group details
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     responses:
 *       200:
 *         description: Profile data
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
 */

/**
 * @swagger
 * /api/student/profile-image:
 *   get:
 *     summary: Get profile image
 *     description: Returns student profile image path
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     responses:
 *       200:
 *         description: Profile image path
 *   put:
 *     summary: Update profile image
 *     description: Update student profile image
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [profile_image]
 *             properties:
 *               profile_image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Image updated
 *   delete:
 *     summary: Delete profile image
 *     description: Remove student profile image
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     responses:
 *       200:
 *         description: Image deleted
 */

/**
 * @swagger
 * /api/student/password:
 *   put:
 *     summary: Change password
 *     description: Update student password
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [oldPassword, newPassword, confirmPassword]
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated
 */

/* ============================================
   ATTENDANCE ENDPOINTS
   ============================================ */

/**
 * @swagger
 * /api/student/attendance:
 *   get:
 *     summary: Get attendance history
 *     description: Returns paginated attendance records with month filter
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *           example: "2024-01"
 *         description: Filter by month (YYYY-MM)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
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
 * /api/student/attendance/total:
 *   get:
 *     summary: Get total attendance for a month
 *     description: Returns attendance summary for specific month
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *           example: "2024-01"
 *     responses:
 *       200:
 *         description: Month attendance summary
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

/* ============================================
   PAYMENTS ENDPOINTS
   ============================================ */

/**
 * @swagger
 * /api/student/payments:
 *   get:
 *     summary: Get payment history
 *     description: Returns paginated payment records with month filter
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *           example: "2024-01"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
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

/* ============================================
   EXAMS ENDPOINTS
   ============================================ */

/**
 * @swagger
 * /api/student/exams/paper:
 *   get:
 *     summary: Get paper exams
 *     description: Returns paper exams with student scores and month filter
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *           example: "2024-01"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Paper exams list
 */

/**
 * @swagger
 * /api/student/exams/paper/{examId}:
 *   get:
 *     summary: Get specific paper exam details
 *     description: Returns paper exam details with rank and highest degree
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
 *         description: Exam details
 */

/**
 * @swagger
 * /api/student/exams/results:
 *   get:
 *     summary: Get exam results
 *     description: Returns all paper exam results with month filter
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *           example: "2024-01"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Exam results
 */

/**
 * @swagger
 * /api/student/exams/online/available:
 *   get:
 *     summary: Get available online exams
 *     description: Returns online exams available for student
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
 *     responses:
 *       200:
 *         description: Available online exams
 */

/**
 * @swagger
 * /api/student/exams/online/history:
 *   get:
 *     summary: Get online exams history
 *     description: Returns submitted online exams with month filter
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *           example: "2024-01"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Online exams history
 */

/**
 * @swagger
 * /api/student/exams/online/{attemptId}:
 *   get:
 *     summary: Get specific online exam details
 *     description: Returns online exam attempt with rank and answers summary
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: path
 *         name: attemptId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exam attempt details
 */

/**
 * @swagger
 * /api/student/exams/{examId}/answers:
 *   get:
 *     summary: Get exam answers
 *     description: Returns student answers for a specific exam
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

/* ============================================
   ASSIGNMENTS ENDPOINTS
   ============================================ */

/**
 * @swagger
 * /api/student/assignments:
 *   get:
 *     summary: Get assignments
 *     description: Returns assignments with submission status and month filter
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *           example: "2024-01"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Assignments list
 */

/**
 * @swagger
 * /api/student/assignments/{assignmentId}:
 *   get:
 *     summary: Get specific assignment details
 *     description: Returns assignment with submission details
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
 *     responses:
 *       200:
 *         description: Assignment details
 */

/**
 * @swagger
 * /api/student/submissions:
 *   get:
 *     summary: Get submissions
 *     description: Returns assignment submissions with month filter
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *           example: "2024-01"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Submissions list
 */

/**
 * @swagger
 * /api/student/submissions/{submissionId}:
 *   get:
 *     summary: Get specific submission details
 *     description: Returns submission with assignment details
 *     tags: [Student]
 *     security:
 *       - ApiAuth: []
 *       - ClientToken: []
 *     parameters:
 *       - in: path
 *         name: submissionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Submission details
 */

/* ============================================
   CONTENT ENDPOINTS
   ============================================ */

/**
 * @swagger
 * /api/student/playlists:
 *   get:
 *     summary: Get playlists
 *     description: Returns playlists for student grade with video count
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
