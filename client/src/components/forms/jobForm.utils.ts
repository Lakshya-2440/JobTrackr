import { IJob, JobStatus } from '@/types';
import { toDateInputValue } from '@/utils/formatDate';
import { JobFormValues } from '@/utils/validation';

export const getDefaultJobFormValues = (status?: JobStatus): JobFormValues => ({
  company: '',
  position: '',
  status: status ?? 'WISHLIST',
  priority: 'MEDIUM',
  location: '',
  salaryMin: undefined,
  salaryMax: undefined,
  salaryCurrency: 'USD',
  jobUrl: '',
  description: '',
  notes: '',
  resumeUrl: '',
  appliedDate: '',
  followUpDate: '',
  tags: []
});

export const mapJobToFormValues = (job: IJob): JobFormValues => ({
  company: job.company,
  position: job.position,
  status: job.status,
  priority: job.priority,
  location: job.location ?? '',
  salaryMin: job.salaryMin,
  salaryMax: job.salaryMax,
  salaryCurrency: job.salaryCurrency ?? 'USD',
  jobUrl: job.jobUrl ?? '',
  description: job.description ?? '',
  notes: job.notes ?? '',
  resumeUrl: job.resumeUrl ?? '',
  appliedDate: toDateInputValue(job.appliedDate),
  followUpDate: toDateInputValue(job.followUpDate),
  tags: job.tags ?? []
});

