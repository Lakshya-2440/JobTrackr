import { format } from 'date-fns';
import { IJob } from '@/types';

export const formatDate = (
  value?: string | Date | null,
  pattern = 'MMM d, yyyy',
  fallback = '--'
) => {
  if (!value) {
    return fallback;
  }

  return format(new Date(value), pattern);
};

export const toDateInputValue = (value?: string | null) => {
  if (!value) {
    return '';
  }

  return format(new Date(value), 'yyyy-MM-dd');
};

export const formatCurrencyRange = (job: IJob) => {
  if (!job.salaryMin && !job.salaryMax) {
    return '--';
  }

  const currency = job.salaryCurrency ?? 'USD';
  const formatValue = (value?: number) =>
    value
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency,
          maximumFractionDigits: 0
        }).format(value)
      : null;

  const min = formatValue(job.salaryMin);
  const max = formatValue(job.salaryMax);

  if (min && max) {
    return `${min} - ${max}`;
  }

  return min ?? max ?? '--';
};

