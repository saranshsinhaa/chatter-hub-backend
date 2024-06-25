# Chatter Hub: Group Chat WebApp

## API Documentation

This API documentation provides details about the RESTful APIs available in the Chat Application. The application allows users to register, login, create groups, join/leave groups, and send/receive messages within groups.

## Table of Contents

1. [Health Check](#health-check)
2. [Authentication](#authentication)
   - [Register User](#register-user)
   - [Login User](#login-user)
3. [Groups](#groups)
   - [Create Group](#create-group)
   - [Fetch All Groups](#fetch-all-groups)
   - [Join Group](#join-group)
   - [Leave Group](#leave-group)
4. [Messages](#messages)
   - [Get Messages by Group ID](#get-messages-by-group-id)
5. [Setup](#setup)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Environment Variables](#environment-variables)
   - [Running the Server](#running-the-server)
6. [Contributing](#contributing)
7. [License](#license)

---

## Health Check

Provides detailed information about the server's health and system statistics.

- **URL:** `/api/health`
- **Method:** `GET`
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "status": true,
      "message": {
        "message": "🛠️ API v1 working!",
        "timestamp": "Wed, 25 Jun 2024 15:24:00 GMT",
        "cpus": [ ... ],
        "architecture": "x64",
        "networkInterfaces": { ... },
        "totalMemory": 16777216,
        "freeMemory": 10485760,
        "platform": "linux",
        "osType": "Linux",
        "osRelease": "5.4.0-42-generic",
        "osVersion": "#46-Ubuntu SMP Fri Jul 10 00:24:02 UTC 2020",
        "hostname": "localhost",
        "userInfo": { ... },
        "serverUptime": "00:10:34",
        "osUptime": "00:34:56",
        "reqIP": "192.168.1.1"
      }
    }
    ```

---

## Authentication

### Register User

Registers a new user with a unique username and hashed password.

- **URL:** `/api/users/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Success Response:**
  - **Code:** 201 CREATED
  - **Content:** `"User registered"`
- **Error Responses:**
  - **Code:** 400 BAD REQUEST
    - **Content:** `"Username already exists"` (if username is not unique)
    - **Content:** `Error message` (other validation or database errors)

### Login User

Logs in an existing user with username and password, returns a JWT token.

- **URL:** `/api/users/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    {
      "token": "JWT token",
      "username": "string"
    }
    ```
- **Error Responses:**
  - **Code:** 400 BAD REQUEST
    - **Content:** `"Invalid credentials"`
  - **Code:** 404 NOT FOUND
    - **Content:** `"User not found"`
  - **Code:** 500 INTERNAL SERVER ERROR
    - **Content:** `Error message` (other server-side errors)

---

## Groups

### Create Group

Creates a new group with a unique name.

- **URL:** `/api/groups`
- **Method:** `POST`
- **Authorization:** Required (Bearer token)
- **Request Body:**
  ```json
  {
    "name": "string"
  }
  ```
- **Success Response:**
  - **Code:** 201 CREATED
  - **Content:** Group object (including group ID and name)
- **Error Responses:**
  - **Code:** 400 BAD REQUEST
    - **Content:** `Error message` (validation or database errors)

### Fetch All Groups

Fetches all groups.

- **URL:** `/api/groups`
- **Method:** `GET`
- **Authorization:** Required (Bearer token)
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** Array of group objects
- **Error Responses:**
  - **Code:** 400 BAD REQUEST
    - **Content:** `Error message` (database errors)

### Join Group

Allows a user to join an existing group.

- **URL:** `/api/groups/:groupId/join`
- **Method:** `POST`
- **Authorization:** Required (Bearer token)
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** Updated group object (including updated members list)
- **Error Responses:**
  - **Code:** 400 BAD REQUEST
    - **Content:** `Error message` (validation or database errors)

### Leave Group

Allows a user to leave an existing group.

- **URL:** `/api/groups/:groupId/leave`
- **Method:** `POST`
- **Authorization:** Required (Bearer token)
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** Updated group object (including updated members list)
- **Error Responses:**
  - **Code:** 400 BAD REQUEST
    - **Content:** `Error message` (validation or database errors)

---

## Messages

### Get Messages by Group ID

Retrieves all messages associated with a specific group.

- **URL:** `/api/messages/:groupId`
- **Method:** `GET`
- **Authorization:** Required (Bearer token)
- **Success Response:**
  - **Code:** 200 OK
  - **Content:** Array of message objects
- **Error Responses:**
  - **Code:** 400 BAD REQUEST
    - **Content:** `Error message` (database errors)

---

## Setup

### Prerequisites

- Node.js (version >= 12.0.0)
- MongoDB database

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory of the project with the following variables:

```
PORT=5000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

Replace `<your-mongodb-uri>` and `<your-jwt-secret>` with your actual MongoDB connection URI and a secret key for JWT token.

### Running the Server

Start the development server:

```bash
npm run dev
```

The server will run on `http://localhost:5000` by default.

---

## Developers

<a href="https://github.com/saranshsinhaa"><img style="height: 200px" src="https://avatars.githubusercontent.com/u/77010352?v=4"/></a>

### **Saransh Sinha**

<p><a href="https://github.com/saranshsinhaa"><img src="https://img.icons8.com/material-rounded/48/000000/github.png"/></a> <a href="https://linkedin.com/in/saranshsinhaa"><img src="https://img.icons8.com/material-rounded/48/000000/linkedin.png"/></a><a href="https://twitter.com/saranshsinhaa"><img src="https://img.icons8.com/material-rounded/48/000000/twitter.png"/></a></p>

---

## Contributing

Contributions are welcome! Fork the repository and submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

### Notes:

- Replace `<repository-url>` and `<repository-directory>` with your actual repository URL and directory.
- Make sure to update `<your-mongodb-uri>` and `<your-jwt-secret>` in the `.env` section with your actual MongoDB connection URI and JWT secret key.
- Adjust any details in the markdown file to match your specific application setup or additional features.

This README.md file provides comprehensive documentation including setup instructions, API endpoints details, environment variables, and contribution guidelines. Adjustments can be made based on your specific project requirements or additional features implemented in your application.
