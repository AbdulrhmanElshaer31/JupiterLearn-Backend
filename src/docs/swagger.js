const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "JupiterLearn API",
      version: "1.0.0",
      description: "JupiterLearn Platform API Documentation",
    },
    servers: [{ url: "https://jupiter-learn-backend.vercel.app" }],
    components: {
      securitySchemes: {
        ApiAuth: {
          type: "http",
          scheme: "basic",
          description: "Basic Auth for API (API_USERNAME:API_PASSWORD)",
        },
        ClientToken: {
          type: "apiKey",
          in: "header",
          name: "x-client-key",
          description: "JWT Token for user authentication",
        },
        SuperAdminKey: {
          type: "apiKey",
          in: "header",
          name: "x-super-admin-key",
          description:
            "Basic base64(SUPER_ADMIN_USERNAME:SUPER_ADMIN_PASSWORD) - Additional protection for Super Admin",
        },
      },
    },
  },
  apis: ["./src/docs/*.docs.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
module.exports = swaggerSpec;
