# JobTrackr

A production-ready full-stack job application tracker built with React, Node.js, Express, Prisma, and Neon PostgreSQL. JobTrackr helps users manage a job search with a Kanban pipeline, secure authentication, resume uploads, reminders, and analytics for application progress.

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

- JWT auth with refresh-token cookies
- Prisma + Neon PostgreSQL integration with pooled and direct URLs
- Protected Express APIs with validation, rate limiting, and centralized errors
- Drag-and-drop Kanban workflow for application stages
- Resume upload pipeline using Multer and Cloudinary
- Dashboard and analytics views with charts and response-rate insights
- Zustand + React Query state management
- Fully typed frontend and backend codebase

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
