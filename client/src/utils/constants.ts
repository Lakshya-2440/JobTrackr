import { ChartColumnBig, KanbanSquare, LayoutDashboard } from 'lucide-react';
import { JobStatus, Priority } from '@/types';

export const APP_NAME = 'JobTrackr';

export const JOB_STATUSES: JobStatus[] = [
  'WISHLIST',
  'APPLIED',
  'INTERVIEW',
  'OFFER',
  'REJECTED'
];

export const PRIORITY_OPTIONS: Priority[] = ['LOW', 'MEDIUM', 'HIGH'];

export const STATUS_LABELS: Record<JobStatus, string> = {
  WISHLIST: 'Wishlist',
  APPLIED: 'Applied',
  INTERVIEW: 'Interview',
  OFFER: 'Offer',
  REJECTED: 'Rejected'
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High'
};

export const STATUS_BADGE_CLASSES: Record<JobStatus, string> = {
  WISHLIST: 'bg-slate-800 text-slate-200',
  APPLIED: 'bg-blue-900/30 text-blue-300',
  INTERVIEW: 'bg-violet-900/30 text-violet-300',
  OFFER: 'bg-emerald-900/30 text-emerald-300',
  REJECTED: 'bg-rose-900/30 text-rose-300'
};

export const PRIORITY_BADGE_CLASSES: Record<Priority, string> = {
  LOW: 'bg-slate-800 text-slate-200',
  MEDIUM: 'bg-amber-900/30 text-amber-300',
  HIGH: 'bg-rose-900/30 text-rose-300'
};

export const STATUS_BORDER_CLASSES: Record<JobStatus, string> = {
  WISHLIST: 'border-slate-400',
  APPLIED: 'border-blue-500',
  INTERVIEW: 'border-violet-500',
  OFFER: 'border-emerald-500',
  REJECTED: 'border-rose-500'
};

export const STATUS_CHART_COLORS: Record<JobStatus, string> = {
  WISHLIST: '#64748B',
  APPLIED: '#2563EB',
  INTERVIEW: '#7C3AED',
  OFFER: '#16A34A',
  REJECTED: '#EF4444'
};

export const NAV_ITEMS = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard
  },
  {
    label: 'Kanban Board',
    path: '/kanban',
    icon: KanbanSquare
  },
  {
    label: 'Analytics',
    path: '/analytics',
    icon: ChartColumnBig
  }
] as const;
