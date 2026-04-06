# JobTrackr

A production-ready full-stack job application tracker built with React, Node.js, Express, Prisma, and Neon PostgreSQL. JobTrackr helps users manage a job search with a Kanban pipeline, secure authentication, resume uploads, reminders, analytics for application progress, and a server-backed RAG assistant.

## Screenshots

Add your screenshots here after running the app locally:

- `Dashboard` placeholder
- `Kanban Board` placeholder
- `Analytics` placeholder
- `Job Detail` placeholder

## Tech Stack

### Frontend

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router v6
- TanStack Query v5
- Zustand
- React Hook Form + Zod
- Axios
- Recharts
- `@hello-pangea/dnd`
- React Hot Toast
- date-fns
- Lucide React

### Backend

- Node.js + Express + TypeScript
- Prisma ORM
- Neon DB (serverless PostgreSQL)
- Zod
- JWT authentication
- bcryptjs
- Multer
- Cloudinary
- Helmet
- Morgan
- express-rate-limit

## Prerequisites

- Node.js 18+
- npm 9+
- Neon account and PostgreSQL database
- Cloudinary account for resume uploads

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd jobtrackr
```

### 2. Install dependencies

```bash
cd server
npm install
cd ../client
npm install
cd ..
```

### 3. Configure environment variables

Copy the example file to the project root:

```bash
cp .env.example .env
```

Fill in:

- `DATABASE_URL` with your Neon pooled connection string
- `DIRECT_URL` with your Prisma migration connection string
- `JWT_SECRET` and `JWT_REFRESH_SECRET`
- `CLOUDINARY_*` credentials
- `OPENAI_API_KEY` if you want the assistant to use embeddings and model answers instead of the local fallback

The frontend Vite app is configured with `envDir: '..'`, so the root `.env` file is used by both the frontend and backend.

### 4. Run Prisma migrations and generate the client

```bash
cd server
npm run db:migrate
npm run db:generate
```

### 5. Start the development servers

Open two terminals:

```bash
cd server
npm run dev
```

```bash
cd client
npm run dev
```

Frontend:

- `http://localhost:5173`

Backend:

- `http://localhost:5000`

## Environment Variables

The repo ships with a root [`.env.example`](/Users/lakshyagupta/Desktop/job_tracker/.env.example).

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | Yes | Express server port |
| `DATABASE_URL` | Yes | Neon pooled PostgreSQL connection string |
| `DIRECT_URL` | Yes | Neon direct Prisma migration connection string |
| `JWT_SECRET` | Yes | Access token secret, minimum 32 chars |
| `JWT_EXPIRES_IN` | Yes | Access token lifetime, default `7d` |
| `JWT_REFRESH_SECRET` | Yes | Refresh token secret, minimum 32 chars |
| `JWT_REFRESH_EXPIRES_IN` | Yes | Refresh token lifetime, default `30d` |
| `CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Yes | Cloudinary API secret |
| `OPENAI_API_KEY` | No | Enables the RAG assistant |
| `OPENAI_CHAT_MODEL` | No | Chat model for answer generation |
| `OPENAI_EMBEDDING_MODEL` | No | Embedding model for retrieval |
| `RAG_TOP_K` | No | Number of retrieved documents passed into the prompt |
| `CLIENT_URL` | Yes | Allowed frontend origin for CORS |
| `NODE_ENV` | Yes | Runtime environment |
| `VITE_API_URL` | Optional | Frontend API base URL, defaults to `/api` |

## Available Scripts

### Server

```bash
cd server
npm run dev
npm run build
npm run start
npm run db:migrate
npm run db:generate
npm run db:push
npm run db:studio
```

### Client

```bash
cd client
npm run dev
npm run build
npm run preview
```

## API Reference

All success responses use:

```json
{
  "success": true,
  "data": {}
}
```

All error responses use:

```json
{
  "success": false,
  "message": "Something went wrong",
  "errors": {}
}
```

### Authentication

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Register a new user and set refresh cookie | No |
| `POST` | `/api/auth/login` | Log in and set refresh cookie | No |
| `POST` | `/api/auth/refresh` | Exchange refresh cookie for a new access token | No |
| `POST` | `/api/auth/logout` | Clear the refresh cookie | No |
| `GET` | `/api/auth/me` | Return the authenticated user profile | Yes |

### Jobs

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| `GET` | `/api/jobs` | Fetch paginated jobs with filters | Yes |
| `POST` | `/api/jobs` | Create a new job application | Yes |
| `GET` | `/api/jobs/analytics/summary` | Fetch analytics summary | Yes |
| `GET` | `/api/jobs/:id` | Fetch one job with contacts | Yes |
| `PATCH` | `/api/jobs/:id` | Update a job application | Yes |
| `PATCH` | `/api/jobs/:id/status` | Move a job to another pipeline state | Yes |
| `DELETE` | `/api/jobs/:id` | Delete a job application | Yes |

### Uploads

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| `POST` | `/api/upload/resume` | Upload a resume to Cloudinary | Yes |

### Assistant

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| `POST` | `/api/assistant/query` | Ask the RAG assistant a question about your applications | Yes |

## Folder Structure

```text
jobtrackr/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── store/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── vite.config.ts
├── server/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

## Key Features

### Authentication and Session Management

- User registration and login
- JWT access tokens with refresh-token cookie flow
- Automatic token refresh in the frontend API client
- Protected routes and protected backend endpoints

### Job Application Tracking

- Full CRUD for job applications
- Rich job fields: company, position, status, priority, location, salary range/currency, job URL
- Timeline fields: applied date and follow-up date
- Notes, description, tags, and linked recruiter contacts
- Server-side filtering, sorting, search, and pagination

### Kanban Pipeline Workflow

- Drag-and-drop board using application stages: WISHLIST, APPLIED, INTERVIEW, OFFER, REJECTED
- Fast status updates via card movement
- Slide-over and full-page detail views for each application

### Resume and Document Handling

- Resume upload endpoint with Multer memory storage
- File type validation (PDF/DOC/DOCX) and file-size limits
- Cloudinary storage integration for uploaded resumes

### Analytics and Insights

- Dashboard summary cards: total applications, active pipeline, interviews, offers
- Analytics summary endpoint
- Status distribution pie chart
- Applications-over-time chart
- Response-rate calculation and quick trend indicators

### RAG Assistant (Implemented End to End)

- Dedicated assistant API: `POST /api/assistant/query`
- Per-job retrieval documents stored in Postgres via Prisma
- Embedding generation for job documents and user queries
- Similarity-based retrieval of top-K relevant records
- LLM answer generation grounded in retrieved job context
- Source list returned with relevance scores
- Safe fallback mode when OpenAI key/model is unavailable, so core app behavior never breaks

### Platform and Engineering Quality

- Prisma + Neon PostgreSQL with managed migrations
- Express middleware stack: Helmet, CORS, rate limiting, validation, centralized error handling
- React + TypeScript frontend with TanStack Query and Zustand
- Fully typed frontend/backend contracts
- Production build validation for both server and client

## Deployment Notes

### Backend on Render

- Create a new Web Service pointed at the `server/` directory
- Set the build command to `npm install && npm run build`
- Set the start command to `npm run start`
- Add all environment variables from the root `.env`
- Ensure Neon and Cloudinary credentials are configured in Render

### Frontend on Vercel

- Import the repository and set the root directory to `client/`
- Build command: `npm run build`
- Output directory: `dist`
- Add `VITE_API_URL` if you are calling a deployed backend URL instead of same-origin `/api`
- If the backend is on a different domain, update `CLIENT_URL` on the server to the deployed Vercel URL

## Validation Notes

Verified locally with:

- `cd server && npm run build`
- `cd client && npm run build`

## Future Improvements

- Add contact management directly in job forms
- Add calendar reminders and email notifications
- Add dark mode toggle persistence
- Add saved filters and richer search facets
- Add end-to-end tests with Playwright
