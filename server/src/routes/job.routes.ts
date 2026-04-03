import { Router } from 'express';
import { z } from 'zod';
import { jobController } from '../controllers/job.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateBody, validateParams, validateQuery } from '../middleware/validate.middleware';
import {
  createJobSchema,
  jobFiltersSchema,
  updateJobSchema,
  updateStatusSchema
} from '../schemas/job.schema';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
const jobIdSchema = z.object({
  id: z.string().uuid('A valid job id is required')
});

router.use(authenticate);

router.get('/', validateQuery(jobFiltersSchema), asyncHandler(jobController.getAll));
router.post('/', validateBody(createJobSchema), asyncHandler(jobController.create));
router.get('/analytics/summary', asyncHandler(jobController.getAnalytics));
router.get('/:id', validateParams(jobIdSchema), asyncHandler(jobController.getById));
router.patch(
  '/:id',
  validateParams(jobIdSchema),
  validateBody(updateJobSchema),
  asyncHandler(jobController.update)
);
router.patch(
  '/:id/status',
  validateParams(jobIdSchema),
  validateBody(updateStatusSchema),
  asyncHandler(jobController.updateStatus)
);
router.delete('/:id', validateParams(jobIdSchema), asyncHandler(jobController.delete));

export default router;
