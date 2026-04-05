import { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tone: 'blue' | 'amber' | 'violet' | 'green';
}

const toneClasses: Record<StatCardProps['tone'], string> = {
  blue: 'bg-blue-950/40 text-blue-300',
  amber: 'bg-amber-950/40 text-amber-300',
  violet: 'bg-violet-950/40 text-violet-300',
  green: 'bg-emerald-950/40 text-emerald-300'
};

export const StatCard = ({ label, value, icon: Icon, tone }: StatCardProps) => (
  <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-sm">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-slate-400">{label}</p>
        <p className="mt-3 text-3xl font-bold tracking-tight text-white">
          {value}
        </p>
      </div>
      <div className={cn('rounded-2xl p-3', toneClasses[tone])}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
);

