// src/docs/swagger.js

const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "JupiterLearn API",
      version: "1.0.0",
      description: "JupiterLearn Platform API Documentation",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        ApiAuth: {
          type: "http",
          scheme: "basic",
          description: "Basic Auth for API",
        },
        ClientToken: {
          type: "apiKey",
          in: "header",
          name: "x-client-key",
          description: "JWT Token for user authentication",
        },
      },
    },
  },
  apis: ["./src/docs/*.docs.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
module.exports = swaggerSpec;
