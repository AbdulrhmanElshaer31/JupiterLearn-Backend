# JupiterLearn Platform API

JupiterLearn is the online learning platform companion to **Center Boshta**, a comprehensive educational centre management system.

The platform provides students with access to video courses, online examinations, assignments, and academic performance tracking. It also provides teachers and assistants with analytics, educational content management, and student performance tools.

---

## Overview

JupiterLearn is designed to extend the capabilities of the Center Boshta management system into an online learning environment.

The API handles:

- Student authentication and access control
- Video courses and playlists
- Online examinations
- Assignment submissions
- Academic performance tracking
- Attendance and payment information
- Teacher and assistant analytics
- Educational content management
- Parent dashboards
- Synchronisation with the Center Boshta desktop application

---

## Base URL

```text
https://boshta.com
```

---

## API Documentation

Interactive API documentation is available through Swagger/OpenAPI.

The documentation includes:

- Available API endpoints
- Request parameters
- Request bodies
- Authentication requirements
- Response schemas
- Endpoint testing

**API Documentation:**

```text
https://boshta.com/api-docs
```

---

## Authentication

The API uses two authentication layers:

1. **Basic Authentication**
2. **JWT Authentication**

Requests must include both authentication headers.

### Basic Authentication

The `Authorization` header is used for API-level authentication.

```http
Authorization: Basic <credentials>
```

### JWT Authentication

After successfully logging in, the client receives a JWT token.

The token must be included in the `x-client-key` header:

```http
x-client-key: <jwt-token>
```

### Authentication Flow

```text
Client
  |
  | Login Request
  v
Authentication Endpoint
  |
  | JWT Token
  v
Client
  |
  | Authorization + x-client-key
  v
Protected API Endpoint
```

---

## User Roles

| Role          | Capabilities                                                                             |
| ------------- | ---------------------------------------------------------------------------------------- |
| **Student**   | View courses, take examinations, submit assignments, and track attendance and payments   |
| **Teacher**   | View statistics, analytics, student data, and educational content                        |
| **Assistant** | Manage examinations, videos, playlists, assignments, and access all teacher capabilities |
| **Parent**    | View a dashboard containing their child's academic status                                |

---

## API Structure

Role-specific endpoints are organised under dedicated API prefixes:

```text
/api/student
/api/teacher
/api/assistant
/api/parent
```

For example:

```http
GET /api/student/courses
GET /api/teacher/statistics
GET /api/assistant/exams
GET /api/parent/dashboard
```

The complete list of available endpoints can be found in the interactive API documentation.

---

## Quick Start

### 1. Authenticate

Use the appropriate login endpoint to authenticate the user and obtain a JWT token.

### 2. Configure Basic Authentication

Include the required Basic Authentication credentials in the request:

```http
Authorization: Basic <credentials>
```

### 3. Add the JWT Token

Include the JWT token returned from the login endpoint:

```http
x-client-key: <jwt-token>
```

### 4. Access Protected Endpoints

Use the appropriate role-based API routes:

```text
/api/student
/api/teacher
/api/assistant
/api/parent
```

### 5. Explore the API

Use the Swagger documentation to explore and test available endpoints:

```text
https://boshta.com/api-docs
```

---

## Technology Stack

| Technology                    | Purpose                               |
| ----------------------------- | ------------------------------------- |
| **Node.js**                   | Backend runtime                       |
| **Express.js**                | REST API framework                    |
| **PostgreSQL**                | Relational database                   |
| **JWT**                       | User authentication and authorisation |
| **Basic Auth**                | API-level authentication              |
| **Swagger / OpenAPI 3.0**     | API documentation                     |
| **Center Boshta Desktop App** | Data synchronisation and management   |

---

## System Integration

JupiterLearn is integrated with the **Center Boshta** desktop management system.

The desktop application manages the centre's operational data, while JupiterLearn provides the online learning layer for students, teachers, assistants, and parents.

```text
                    Center Boshta
                   Desktop System
                         |
                         | Synchronisation
                         v
                  PostgreSQL Database
                         |
                         v
              JupiterLearn Platform API
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
       Students       Teachers       Assistants
          |
          v
       Parents
```

---

## Project Information

| Property          | Details                   |
| ----------------- | ------------------------- |
| **Project**       | JupiterLearn Platform API |
| **Parent System** | Center Boshta             |
| **Architecture**  | RESTful API               |
| **Database**      | PostgreSQL                |
| **Documentation** | OpenAPI 3.0 / Swagger     |
