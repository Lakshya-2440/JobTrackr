import { Router } from 'express';
import { z } from 'zod';
import { assistantController } from '../controllers/assistant.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

const askSchema = z.object({
  question: z.string().trim().min(1, 'Question is required').max(1000, 'Question is too long')
});

router.use(authenticate);

router.post('/query', validateBody(askSchema), asyncHandler(assistantController.ask));

export default router;
