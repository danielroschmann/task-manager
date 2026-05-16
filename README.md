# AI-Powered Household Productivity Platform

A fullstack web application focused on simplifying everyday household coordination through AI-assisted productivity tools.

The platform started as a task management application, but has evolved into a broader household assistant that combines:

* AI-powered task prioritization
* Shared household productivity
* Real-time electricity pricing integration
* Smart daily planning
* Modern fullstack architecture

## Features

### Task Management

* Create tasks
* View all tasks
* Mark tasks as completed
* Delete tasks
* Store tasks persistently in PostgreSQL

### AI Task Prioritization

Uses a locally hosted LLM through Ollama to:

* Analyze unfinished tasks
* Prioritize tasks dynamically
* Help users focus on the most important tasks first

### Electricity Price Integration

Integrates with the Danish electricity pricing API:

* Fetches real-time electricity prices
* Enables future smart scheduling features
* Opens possibilities for energy-aware household planning

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript

### Backend

* Express.js
* Node.js
* TypeScript

### Database

* PostgreSQL
* Prisma ORM

### AI

* Ollama
* Llama 3

## Architecture

The project follows a separated frontend/backend architecture.

### Frontend

Responsible for:

* UI rendering
* User interaction
* Form handling
* API communication

### Backend

Responsible for:

* Business logic
* Database access
* AI integration
* External API integrations

### Database Layer

Prisma is used as the ORM for:

* Type-safe database queries
* Schema management
* Migrations

## Project Structure

```text
frontend/
├── src/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── lib/
│   └── types/

backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── config/
│   └── utils/
├── prisma/
└── package.json
```

## Running the Project

### 1. Clone the repository

```bash
git clone <repo-url>
cd <repo-name>
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## PostgreSQL Setup

Create a PostgreSQL database and configure your environment variables.

Example:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/task_manager"
```

Run migrations:

```bash
npx prisma migrate dev
```

Open Prisma Studio:

```bash
npx prisma studio
```

---

## Ollama Setup

Install Ollama:

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Download and run Llama 3:

```bash
ollama run llama3
```

Ollama API runs locally on:

```text
http://localhost:11434
```

## API Endpoints

### Tasks

| Method | Endpoint   | Description            |
| ------ | ---------- | ---------------------- |
| GET    | /tasks     | Get all tasks          |
| POST   | /tasks     | Create a task          |
| PATCH  | /tasks/:id | Toggle task completion |
| DELETE | /tasks/:id | Delete a task          |
| GET    | /tasks/:id | Get single task        |

### AI

| Method | Endpoint               | Description                           |
| ------ | ---------------------- | ------------------------------------- |
| POST   | /tasks/prioritizetasks | AI prioritization of unfinished tasks |

### Electricity Prices

| Method | Endpoint            | Description                    |
| ------ | ------------------- | ------------------------------ |
| GET    | /electricity-prices | Fetch daily electricity prices |

## Future Ideas

* Shared household accounts
* AI daily planning
* Smart energy-aware scheduling
* Calendar integration
* Push notifications
* Household analytics
* AI-generated grocery suggestions
* Streaming/movie recommendation system
* Smart routines and automations

## Learning Goals

This project is focused on gaining practical experience with:

* Fullstack application architecture
* TypeScript
* React and Next.js App Router
* REST API development
* PostgreSQL and Prisma
* AI integration
* Local LLM inference
* External API integrations
* Modern web development workflows

## Status

Currently under active development.
