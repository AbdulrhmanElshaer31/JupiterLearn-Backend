const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../../.env") });
module.exports = {
  PORT: Number(process.env.PORT) || 3000,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_NAME: process.env.DB_NAME || "center_db",
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV ,
  EXPIRES_DATE: process.env.EXPIRES_DATE || "7d",
  API_USERNAME: process.env.API_USERNAME,
  API_PASSWORD: process.env.API_PASSWORD
};
