import { z } from 'zod';
import { JobPayload } from '@/types';

const optionalString = z.string().optional().or(z.literal(''));

const optionalUrl = z
  .string()
  .url('Enter a valid URL')
  .optional()
  .or(z.literal(''));

const optionalPositiveNumber = z.preprocess((value) => {
  if (value === '' || value === undefined || value === null || Number.isNaN(value)) {
    return undefined;
  }

  return Number(value);
}, z.number().positive('Must be greater than 0').optional());

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm your password')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
  });

const jobSchemaFields = {
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  status: z.enum(['WISHLIST', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  location: optionalString,
  salaryMin: optionalPositiveNumber,
  salaryMax: optionalPositiveNumber,
  salaryCurrency: optionalString,
  jobUrl: optionalUrl,
  description: optionalString,
  notes: optionalString,
  resumeUrl: optionalString,
  appliedDate: z.string().optional(),
  followUpDate: z.string().optional(),
  tags: z.array(z.string()).optional()
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

export const updateJobSchema = updateJobObjectSchema.refine(
  (data) =>
    data.salaryMin === undefined ||
    data.salaryMax === undefined ||
    data.salaryMax >= data.salaryMin,
  {
    message: 'Salary max must be greater than or equal to salary min',
    path: ['salaryMax']
  }
);

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type JobFormValues = z.infer<typeof createJobSchema>;

const cleanValue = (value?: string) => {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

export const toJobPayload = (values: JobFormValues): JobPayload => ({
  company: values.company.trim(),
  position: values.position.trim(),
  status: values.status,
  priority: values.priority,
  location: cleanValue(values.location),
  salaryMin: values.salaryMin,
  salaryMax: values.salaryMax,
  salaryCurrency: cleanValue(values.salaryCurrency) ?? 'USD',
  jobUrl: cleanValue(values.jobUrl),
  description: cleanValue(values.description),
  notes: cleanValue(values.notes),
  resumeUrl: cleanValue(values.resumeUrl),
  appliedDate: cleanValue(values.appliedDate),
  followUpDate: cleanValue(values.followUpDate),
  tags: values.tags?.filter(Boolean) ?? []
});

export const parseTagsInput = (value: string) =>
  value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
