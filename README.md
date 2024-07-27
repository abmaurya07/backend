# Task Management Backend

## Introduction
This is the backend server for the Task Management App. It is built using Node.js, Express, and MongoDB. The server handles user authentication, task management, and serves API endpoints for the frontend application.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

## Features
- User authentication with JWT tokens
- Password encryption using bcrypt
- Task creation, updating, deletion, and fetching
- Middleware for authentication
- Structured using MVC architecture

## Installation
To install and run the backend server locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/abmaurya07/backend-for-taskmanagement/
    ```
2. Navigate to the project directory:
    ```bash
    cd backend-for-taskmanagement
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file in the root directory and add the following:
    ```plaintext
    PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   JWT_REFRESH_SECRET=<your-jwt-refresh-secret>
   CLIENT_URL=<localhost:3000 or production client url>
    ```

5. Start the server:
    ```bash
    npm start
    ```

## Usage
The backend server exposes a set of API endpoints to be used by the frontend application. Ensure that your MongoDB server is running and accessible with the connection string provided in the `.env` file.

## API Endpoints
### Authentication
- `POST /api/signup`: Register a new user
- `POST /api/login`: User login
- `POST /api/refreshToken`: Refresh JWT token

### Tasks
- `POST /api/tasks/addTask`: Add a new task
- `POST /api/tasks/bulkDelete`: Bulk delete tasks
- `DELETE /api/tasks/deleteTask`: Delete a task
- `GET /api/tasks/fetchTasks`: Fetch all tasks
- `GET /api/tasks/taskSummary`: Get task summary
- `PUT /api/tasks/updateTask`: Update a task
- `PUT /api/tasks/updateTaskStatus`: Update task status

## Configuration
Sensitive data and configuration values are stored in environment variables. Create a `.env` file in the root directory and add your configuration values.

`.env` file structure:
```plaintext
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
JWT_REFRESH_SECRET=<your-jwt-refresh-secret>
CLIENT_URL=<localhost:3000 or production client url>
```
## Dependencies
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [dotenv](https://www.npmjs.com/package/dotenv)

## Troubleshooting
- Ensure all environment variables are correctly set in the `.env` file.
- Make sure the MongoDB server is running and accessible at the URL specified in the environment variables.
- Verify that all required dependencies are installed by running `npm install`.

## Contributors
- [Abhishek Maurya](https://github.com/abmaurya07)
