# To-Do List App (React + Java)

This repository contains a full-stack To-Do List app:

- Frontend: React + Vite
- Backend: Java + Spring Boot

## Project Structure

- `frontend/` React client
- `backend/` Spring Boot API

## Prerequisites

- Java 17+
- Maven 3.9+
- Node.js 18+

## Run the Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`.

## Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## API Endpoints

- `GET /api/todos` List all tasks
- `POST /api/todos` Create task
- `PUT /api/todos/{id}/toggle` Toggle completion
- `DELETE /api/todos/{id}` Delete task