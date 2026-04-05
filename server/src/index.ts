import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { clientOrigins, env } from './config/env';
import { prisma } from './config/prisma';
import { errorHandler } from './middleware/error.middleware';
import authRoutes from './routes/auth.routes';
import jobRoutes from './routes/job.routes';
import uploadRoutes from './routes/upload.routes';
import { ApiError } from './utils/ApiError';

const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin: clientOrigins.length === 1 ? clientOrigins[0] : clientOrigins,
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many authentication requests, please try again later'
    });
  }
});

app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/upload', uploadRoutes);

app.use((_req, _res, next) => {
  next(new ApiError(404, 'Route not found'));
});

app.use(errorHandler);

const server = app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
});

const shutdown = async () => {
  await prisma.$disconnect();
  server.close(() => {
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('unhandledRejection', async (reason) => {
  console.error('Unhandled rejection:', reason);
  await shutdown();
});

