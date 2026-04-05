import { IJob, JobStatus, Priority } from '@/types';
import { PRIORITY_LABELS, STATUS_LABELS } from '@/utils/constants';

const STATUS_KEYWORDS: Array<{ status: JobStatus; keywords: string[] }> = [
  { status: 'WISHLIST', keywords: ['wishlist', 'wish list'] },
  { status: 'APPLIED', keywords: ['applied', 'application sent'] },
  { status: 'INTERVIEW', keywords: ['interview', 'interviews'] },
  { status: 'OFFER', keywords: ['offer', 'offers'] },
  { status: 'REJECTED', keywords: ['rejected', 'reject', 'rejection'] }
];

const PRIORITY_KEYWORDS: Array<{ priority: Priority; keywords: string[] }> = [
  { priority: 'LOW', keywords: ['low'] },
  { priority: 'MEDIUM', keywords: ['medium'] },
  { priority: 'HIGH', keywords: ['high'] }
];

const STATUS_ORDER: JobStatus[] = ['WISHLIST', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED'];
const PRIORITY_ORDER: Priority[] = ['HIGH', 'MEDIUM', 'LOW'];

const normalize = (value: string) => value.toLowerCase().trim();

const findStatus = (question: string): JobStatus | null => {
  const q = normalize(question);

  for (const item of STATUS_KEYWORDS) {
    if (item.keywords.some((keyword) => q.includes(keyword))) {
      return item.status;
    }
  }

  return null;
};

const findPriority = (question: string): Priority | null => {
  const q = normalize(question);

  for (const item of PRIORITY_KEYWORDS) {
    if (item.keywords.some((keyword) => q.includes(keyword))) {
      return item.priority;
    }
  }

  return null;
};

const formatJob = (job: IJob) => `${job.company} - ${job.position}`;

const formatJobList = (jobs: IJob[]) => {
  if (jobs.length === 0) {
    return 'None.';
  }

  const maxItems = 8;
  const visible = jobs.slice(0, maxItems).map((job) => `- ${formatJob(job)}`).join('\n');

  if (jobs.length <= maxItems) {
    return visible;
  }

  return `${visible}\n- +${jobs.length - maxItems} more`;
};

export const answerJobQuestion = (question: string, jobs: IJob[]): string => {
  const q = normalize(question);

  if (!q) {
    return 'Please ask a question about your applications.';
  }

  if (jobs.length === 0) {
    return 'You do not have any applications yet. Add an application first, then I can summarize by status and priority.';
  }

  const wantsCount = /(how many|count|number|total|breakdown|distribution)/.test(q);
  const wantsList = /(which|list|show|ones|what are)/.test(q);
  const asksStatus = /(status|stage|pipeline)/.test(q);
  const asksCategory = /(category|categories|priority)/.test(q);

  const selectedStatus = findStatus(q);
  const selectedPriority = findPriority(q);

  if (selectedStatus) {
    const filtered = jobs.filter((job) => job.status === selectedStatus);

    if (wantsCount && !wantsList) {
      return `${STATUS_LABELS[selectedStatus]}: ${filtered.length} application(s).`;
    }

    return `${STATUS_LABELS[selectedStatus]} (${filtered.length}):\n${formatJobList(filtered)}`;
  }

  if (selectedPriority) {
    const filtered = jobs.filter((job) => job.priority === selectedPriority);

    if (wantsCount && !wantsList) {
      return `${PRIORITY_LABELS[selectedPriority]} priority: ${filtered.length} application(s).`;
    }

    return `${PRIORITY_LABELS[selectedPriority]} priority (${filtered.length}):\n${formatJobList(filtered)}`;
  }

  if (asksStatus || q.includes('in which status')) {
    const breakdown = STATUS_ORDER.map((status) => {
      const count = jobs.filter((job) => job.status === status).length;
      return `${STATUS_LABELS[status]}: ${count}`;
    }).join('\n');

    return `Status breakdown (total ${jobs.length}):\n${breakdown}`;
  }

  if (asksCategory || q.includes('in which category')) {
    const breakdown = PRIORITY_ORDER.map((priority) => {
      const count = jobs.filter((job) => job.priority === priority).length;
      return `${PRIORITY_LABELS[priority]}: ${count}`;
    }).join('\n');

    return `Priority breakdown:\n${breakdown}`;
  }

  if (wantsCount || q.includes('summary')) {
    const statusBreakdown = STATUS_ORDER.map((status) => {
      const count = jobs.filter((job) => job.status === status).length;
      return `${STATUS_LABELS[status]}: ${count}`;
    }).join('\n');

    return `You have ${jobs.length} total application(s).\n\nBy status:\n${statusBreakdown}`;
  }

  if (wantsList || q.includes('all applications')) {
    return `All applications (${jobs.length}):\n${formatJobList(jobs)}`;
  }

  return [
    'I can help with your application counts and lists.',
    'Try asking:',
    '- How many applications are in each status?',
    '- Which ones are in interview?',
    '- How many applications are in each priority?'
  ].join('\n');
};
