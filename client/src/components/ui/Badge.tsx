import { ReactNode } from 'react';
import { JobStatus, Priority } from '@/types';
import {
  PRIORITY_BADGE_CLASSES,
  PRIORITY_LABELS,
  STATUS_BADGE_CLASSES,
  STATUS_LABELS
} from '@/utils/constants';
import { cn } from '@/utils/cn';

type DataBadgeProps = {
  variant: 'status' | 'priority';
  value: JobStatus | Priority;
  children?: never;
  className?: string;
};

type MarketingBadgeProps = {
  variant?: 'indigo' | 'cyan' | 'neutral';
  value?: never;
  children: ReactNode;
  className?: string;
};

type BadgeProps = DataBadgeProps | MarketingBadgeProps;

const marketingBadgeClasses: Record<NonNullable<MarketingBadgeProps['variant']>, string> = {
  indigo: 'border border-indigo-400/25 bg-indigo-500/10 text-indigo-100 shadow-[0_14px_40px_-28px_rgba(99,102,241,1)]',
  cyan: 'border border-cyan-300/20 bg-cyan-400/10 text-cyan-100 shadow-[0_14px_40px_-28px_rgba(34,211,238,1)]',
  neutral: 'border border-white/10 bg-white/[0.04] text-white/78'
};

export const Badge = (props: BadgeProps) => {
  if (props.variant === 'status' || props.variant === 'priority') {
    const isStatus = props.variant === 'status';
    const label = isStatus
      ? STATUS_LABELS[props.value as JobStatus]
      : PRIORITY_LABELS[props.value as Priority];
    const badgeClass = isStatus
      ? STATUS_BADGE_CLASSES[props.value as JobStatus]
      : PRIORITY_BADGE_CLASSES[props.value as Priority];

    return (
      <span
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
          badgeClass,
          props.className
        )}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.22em]',
        marketingBadgeClasses[props.variant ?? 'indigo'],
        props.className
      )}
    >
      {props.children}
    </span>
  );
};
