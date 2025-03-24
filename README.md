# Task Manager API

A simple CRUD backend using Node.js, Express, MongoDB, and Prisma ORM with enhanced terminal output.

## Setup

1. Make sure you have MongoDB running locally on port 27017
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- RESTful API for task management
- MongoDB database with Prisma ORM
- Enhanced terminal output with:
  - Database connection status
  - Server accessibility information
  - Network interface details
  - API endpoint URLs

## API Endpoints

### Base URL

```
http://localhost:3000/api
```

### Tasks Endpoints

| Method | Endpoint   | Description       | Request Body                                                                            |
| ------ | ---------- | ----------------- | --------------------------------------------------------------------------------------- |
| GET    | /tasks     | Get all tasks     | None                                                                                    |
| GET    | /tasks/:id | Get a task by ID  | None                                                                                    |
| POST   | /tasks     | Create a new task | `{ "title": "Task Title", "description": "Task description" }`                          |
| PUT    | /tasks/:id | Update a task     | `{ "title": "Updated Title", "description": "Updated description", "completed": true }` |
| DELETE | /tasks/:id | Delete a task     | None                                                                                    |

## Testing Endpoints with curl

### Get all tasks

```bash
curl -X GET http://localhost:3000/api/tasks
```

### Get a task by ID

```bash
curl -X GET http://localhost:3000/api/tasks/[task-id]
```

### Create a new task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Node.js", "description": "Study Express and Prisma"}'
```

### Update a task

```bash
curl -X PUT http://localhost:3000/api/tasks/[task-id] \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Node.js", "description": "Study Express and Prisma", "completed": true}'
```

### Delete a task

```bash
curl -X DELETE http://localhost:3000/api/tasks/[task-id]
```

```

```
