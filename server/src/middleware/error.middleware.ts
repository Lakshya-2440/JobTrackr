import { Prisma } from '@prisma/client';
import { ErrorRequestHandler } from 'express';
import multer from 'multer';
import { ZodError } from 'zod';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const isDevelopment = env.NODE_ENV !== 'production';

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(error.errors ? { errors: error.errors } : {}),
      ...(isDevelopment ? { stack: error.stack } : {})
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      res.status(409).json({
        success: false,
        message: 'A record with that value already exists'
      });
      return;
    }

    if (error.code === 'P2025') {
      res.status(404).json({
        success: false,
        message: 'Record not found'
      });
      return;
    }

    if (error.code === 'P2003') {
      res.status(400).json({
        success: false,
        message: 'Invalid related record reference'
      });
      return;
    }
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.flatten().fieldErrors
    });
    return;
  }

  if (error instanceof multer.MulterError) {
    const message =
      error.code === 'LIMIT_FILE_SIZE'
        ? 'File size must be less than 5MB'
        : 'File upload failed';

    res.status(400).json({
      success: false,
      message
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    success: false,
    message: isDevelopment && error instanceof Error ? error.message : 'Internal Server Error',
    ...(isDevelopment && error instanceof Error ? { stack: error.stack } : {})
  });
};

