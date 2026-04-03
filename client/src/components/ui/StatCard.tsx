import { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tone: 'blue' | 'amber' | 'violet' | 'green';
}

const toneClasses: Record<StatCardProps['tone'], string> = {
  blue: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
  amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
  violet: 'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300',
  green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
};

export const StatCard = ({ label, value, icon: Icon, tone }: StatCardProps) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
      <div className={cn('rounded-2xl p-3', toneClasses[tone])}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
);

