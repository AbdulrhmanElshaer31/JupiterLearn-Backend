const express = require("express");
const cors = require("cors");
const syncRoutes = require("./modules/sync/sync.routes");
const authRouts = require("./modules/auth/auth.routes");
const studentRouts = require("./modules/students/students.routes");
const errorHandler = require("./middlewares/error.middleware");
const apiMiddelware = require("./middlewares/apiAuth.middleware");
const clientAuth = require("./middlewares/clientAuth.middleware");
const assistantRoutes = require("./modules/assistant/assistant.routes");
const assistantAuth = require("./middlewares/assistantAuth.middleware");
const teacherRoutes = require("./modules/teacher/teacher.routes");
const teacherAuth = require("./middlewares/teacherAuth.middleware");
const parentRoutes = require("./modules/parent/parent.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/sync", syncRoutes);
app.use("/api/auth", apiMiddelware, authRouts);
app.use("/api/student", apiMiddelware, clientAuth, studentRouts);
app.use(
  "/api/assistant",
  apiMiddelware,
  clientAuth,
  assistantAuth,
  assistantRoutes,
);
app.use("/api/teacher", apiMiddelware, clientAuth, teacherAuth, teacherRoutes);
app.use("/api/parent", apiMiddelware, parentRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome To Jupiter Learn API!",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);
module.exports = app;
