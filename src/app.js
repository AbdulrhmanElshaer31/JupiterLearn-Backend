const express = require("express");
const cors = require("cors");

// Routes
const authRouts = require("./modules/auth/auth.routes");
const studentRouts = require("./modules/students/students.routes");
const parentRoutes = require("./modules/parent/parent.routes");
const assistantRoutes = require("./modules/assistant/assistant.routes");
const teacherRoutes = require("./modules/teacher/teacher.routes");
const superAdminRoutes = require("./modules/super-admin/super-admin.routes");
const assignmentRoutes = require("./modules/assignments/assignments.routes");
const assignmentSubmissionRoutes = require("./modules/assignment_submissions/assignment_submissions.routes");

// Middleware
const errorHandler = require("./middlewares/error.middleware");
const apiMiddelware = require("./middlewares/apiAuth.middleware");
const clientAuth = require("./middlewares/clientAuth.middleware");
const assistantAuth = require("./middlewares/assistantAuth.middleware");
const teacherAuth = require("./middlewares/teacherAuth.middleware");
const superAdminAuth = require("./middlewares/superAdminAuth.middleware");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", apiMiddelware, authRouts);
app.use("/api/student", apiMiddelware, clientAuth, studentRouts);
app.use("/api/parent", apiMiddelware, parentRoutes);
app.use("/api/assignment", apiMiddelware, clientAuth, assignmentRoutes);
app.use(
  "/api/homeWorkSubmission",
  apiMiddelware,
  clientAuth,
  assignmentSubmissionRoutes,
);
app.use(
  "/api/assistant",
  apiMiddelware,
  clientAuth,
  assistantAuth,
  assistantRoutes,
);
app.use("/api/teacher", apiMiddelware, clientAuth, teacherAuth, teacherRoutes);
app.use(
  "/api/super-admin",
  apiMiddelware,
  clientAuth,
  superAdminAuth,
  superAdminRoutes,
);

// Root
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome To Jupiter Learn API!",
  });
});

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Handler
app.use(errorHandler);

module.exports = app;
