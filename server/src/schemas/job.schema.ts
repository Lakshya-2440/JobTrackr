import { JobStatus, Priority } from '@prisma/client';
import { z } from 'zod';

const optionalString = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value && value.length > 0 ? value : undefined));

const optionalUrl = z
  .string()
  .trim()
  .url('Must be a valid URL')
  .optional()
  .or(z.literal(''))
  .transform((value) => (value ? value : undefined));

const optionalPositiveInt = z
  .preprocess((value) => {
    if (value === '' || value === null || value === undefined) {
      return undefined;
    }

    if (typeof value === 'string') {
      return Number.parseInt(value, 10);
    }

    return value;
  }, z.number().int().positive().optional());

const optionalDate = z
  .preprocess((value) => {
    if (value === '' || value === null || value === undefined) {
      return undefined;
    }

    return value;
  }, z.coerce.date().optional());

const jobSchemaFields = {
  company: z.string().trim().min(1, 'Company is required'),
  position: z.string().trim().min(1, 'Position is required'),
  status: z.nativeEnum(JobStatus).optional(),
  priority: z.nativeEnum(Priority).optional(),
  location: optionalString,
  salaryMin: optionalPositiveInt,
  salaryMax: optionalPositiveInt,
  salaryCurrency: optionalString,
  jobUrl: optionalUrl,
  description: optionalString,
  notes: optionalString,
  resumeUrl: optionalString,
  appliedDate: optionalDate,
  followUpDate: optionalDate,
  tags: z
    .array(z.string().trim().min(1))
    .optional()
    .transform((value) => value?.filter(Boolean) ?? [])
};

const createJobObjectSchema = z.object(jobSchemaFields);
const updateJobObjectSchema = z.object(jobSchemaFields).partial();

export const createJobSchema = createJobObjectSchema.refine(
  (data) =>
    data.salaryMin === undefined ||
    data.salaryMax === undefined ||
    data.salaryMax >= data.salaryMin,
  {
    message: 'Salary max must be greater than or equal to salary min',
    path: ['salaryMax']
  }
);

export const updateJobSchema = updateJobObjectSchema
  .refine(
    (data) =>
      data.salaryMin === undefined ||
      data.salaryMax === undefined ||
      data.salaryMax >= data.salaryMin,
    {
      message: 'Salary max must be greater than or equal to salary min',
      path: ['salaryMax']
    }
  );

export const updateStatusSchema = z.object({
  status: z.nativeEnum(JobStatus)
});

export const jobFiltersSchema = z.object({
  status: z.nativeEnum(JobStatus).optional(),
  priority: z.nativeEnum(Priority).optional(),
  search: optionalString,
  sortBy: z
    .enum(['createdAt', 'updatedAt', 'company', 'position', 'appliedDate', 'followUpDate', 'priority', 'status'])
    .default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20)
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
export type JobFiltersQuery = z.infer<typeof jobFiltersSchema>;
