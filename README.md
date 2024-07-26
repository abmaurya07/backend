# Task Manager API Documentation

## Overview
The Task Manager API allows users to manage their tasks effectively. It includes user authentication (signup and login), task management (create, read, update, delete), and task categorization (To Do, In Progress, Done). The API is built using Node.js, Express, and MongoDB. It also includes JWT-based authentication and bcrypt for password hashing.

## Authentication

### Signup
**Endpoint:** \`POST /api/signup\`

**Description:** Registers a new user and returns a JWT token.

**Request Body:**
\`\`\`json
{
  "username": "string",
  "password": "string"
}
\`\`\`

**Response:**
- Success (201):
  \`\`\`json
  {
    "token": "string"
  }
  \`\`\`
- Error (500):
  \`\`\`json
  {
    "error": "error message"
  }
  \`\`\`

### Login
**Endpoint:** \`POST /api/login\`

**Description:** Authenticates a user and returns a JWT token.

**Request Body:**
\`\`\`json
{
  "username": "string",
  "password": "string"
}
\`\`\`

**Response:**
- Success (200):
  \`\`\`json
  {
    "token": "string"
  }
  \`\`\`
- Error (400):
  \`\`\`json
  {
    "message": "Invalid credentials"
  }
  \`\`\`
- Error (500):
  \`\`\`json
  {
    "error": "error message"
  }
  \`\`\`

## Task Management

### Create Task
**Endpoint:** \`POST /api/tasks\`

**Description:** Creates a new task.

**Request Headers:**
- \`Authorization: Bearer <token>\`

**Request Body:**
\`\`\`json
{
  "title": "string",
  "description": "string",
  "status": "string",
  "dueDate": "date"
}
\`\`\`

**Response:**
- Success (201):
  \`\`\`json
  {
    "task": {
      "_id": "string",
      "title": "string",
      "description": "string",
      "status": "string",
      "dueDate": "date",
      "user": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
  \`\`\`
- Error (500):
  \`\`\`json
  {
    "error": "error message"
  }
  \`\`\`

### Get Tasks
**Endpoint:** \`GET /api/tasks\`

**Description:** Retrieves a paginated list of all tasks for the authenticated user.

**Request Headers:**
- \`Authorization: Bearer <token>\`

**Query Parameters:**
- \`page\` (optional, default: 1)
- \`limit\` (optional, default: 10)

**Response:**
- Success (200):
  \`\`\`json
  [
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "status": "string",
      "dueDate": "date",
      "user": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
  \`\`\`
- Error (500):
  \`\`\`json
  {
    "error": "error message"
  }
  \`\`\`

### Get Tasks by Status
**Endpoint:** \`GET /api/tasks/{status}\`

**Description:** Retrieves a paginated list of tasks by status (To Do, In Progress, Done) for the authenticated user.

**Request Headers:**
- \`Authorization: Bearer <token>\`

**Query Parameters:**
- \`page\` (optional, default: 1)
- \`limit\` (optional, default: 10)

**Response:**
- Success (200):
  \`\`\`json
  [
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "status": "string",
      "dueDate": "date",
      "user": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
  \`\`\`
- Error (500):
  \`\`\`json
  {
    "error": "error message"
  }
  \`\`\`

### Update Task
**Endpoint:** \`PUT /api/tasks/:id\`

**Description:** Updates a task by ID.

**Request Headers:**
- \`Authorization: Bearer <token>\`

**Request Body:**
\`\`\`json
{
  "title": "string",
  "description": "string",
  "status": "string",
  "dueDate": "date"
}
\`\`\`

**Response:**
- Success (200):
  \`\`\`json
  {
    "task": {
      "_id": "string",
      "title": "string",
      "description": "string",
      "status": "string",
      "dueDate": "date",
      "user": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
  \`\`\`
- Error (404):
  \`\`\`json
  {
    "message": "Task not found or not authorized"
  }
  \`\`\`
- Error (500):
  \`\`\`json
  {
    "error": "error message"
  }
  \`\`\`

### Delete Task
**Endpoint:** \`DELETE /api/tasks/:id\`

**Description:** Deletes a task by ID.

**Request Headers:**
- \`Authorization: Bearer <token>\`

**Response:**
- Success (204):
  \`\`\`json
  {
    "message": "Task deleted"
  }
  \`\`\`
- Error (404):
  \`\`\`json
  {
    "message": "Task not found or not authorized"
  }
  \`\`\`
- Error (500):
  \`\`\`json
  {
    "error": "error message"
  }
  \`\`\`

### Bulk Delete Tasks
**Endpoint:** \`DELETE /api/tasks/bulk-delete\`

**Description:** Deletes multiple tasks by IDs.

**Request Headers:**
- \`Authorization: Bearer <token>\`

**Request Body:**
\`\`\`json
{
  "ids": ["string", "string"]
}
\`\`\`

**Response:**
- Success (200):
  \`\`\`json
  {
    "message": "Tasks deleted successfully"
  }
  \`\`\`
- Error (400):
  \`\`\`json
  {
    "message": "Invalid data format"
  }
  \`\`\`
- Error (404):
  \`\`\`json
  {
    "message": "No tasks found or not authorized"
  }
  \`\`\`
- Error (500):
  \`\`\`json
  {
    "message": "Server error",
    "error": "error details"
  }
  \`\`\`

### Task Summary
**Endpoint:** \`GET /api/tasks/summary\`

**Description:** Retrieves a summary of tasks categorized by their status.

**Request Headers:**
- \`Authorization: Bearer <token>\`

**Response:**
- Success (200):
  \`\`\`json
  {
    "taskSummary": {
      "All": "number",
      "To Do": "number",
      "In Progress": "number",
      "Done": "number"
    }
  }
  \`\`\`
- Error (500):
  \`\`\`json
  {
    "error": "error message"
  }
  \`\`\`
