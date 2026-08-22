/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/user/login:
 *   post:
 *     summary: User login (Assistant/Teacher/Super Admin)
 *     tags: [Auth]
 *     security:
 *       - ApiAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [phone, password]
 *             properties:
 *               phone: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Login successful with JWT token
 */

/**
 * @swagger
 * /api/auth/student/login:
 *   post:
 *     summary: Student login
 *     tags: [Auth]
 *     security:
 *       - ApiAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [phone, password]
 *             properties:
 *               phone: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Login successful with JWT token
 */

/**
 * @swagger
 * /api/auth/parent/access:
 *   post:
 *     summary: Parent access by token
 *     tags: [Auth]
 *     security:
 *       - ApiAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token]
 *             properties:
 *               token: { type: string, description: "Parent token from student record" }
 *     responses:
 *       200:
 *         description: Access granted with JWT token
 */