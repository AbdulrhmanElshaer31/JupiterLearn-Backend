const express = require("express");
const cors = require("cors");
const syncRoutes = require("./modules/sync/sync.routes");
const authRouts = require("./modules/auth/auth.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/sync", syncRoutes);
app.use("/api/auth", authRouts);
app.get("/", (req, res) => {
  res.json({
    message: "Welcome To Jupiter Learn Platform!"
  });
});

app.use(errorHandler);
module.exports = app;
