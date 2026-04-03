import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useDeleteJob } from '@/hooks/useJobs';
import { IJob } from '@/types';
import { useUiStore } from '@/store/uiStore';
import { STATUS_BORDER_CLASSES } from '@/utils/constants';
import { cn } from '@/utils/cn';

interface JobCardProps {
  job: IJob;
}

export const JobCard = ({ job }: JobCardProps) => {
  const openJobDetail = useUiStore((state) => state.openJobDetail);
  const openEditJob = useUiStore((state) => state.openEditJob);
  const deleteMutation = useDeleteJob();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <article
        role="button"
        tabIndex={0}
        onClick={() => openJobDetail(job.id)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openJobDetail(job.id);
          }
        }}
        className={cn(
          'group rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-soft dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600',
          'border-l-4',
          STATUS_BORDER_CLASSES[job.status]
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {job.company}
            </h3>
            <p className="truncate text-sm text-slate-500 dark:text-slate-400">{job.position}</p>
          </div>

          <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openEditJob(job.id);
              }}
              className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              aria-label="Edit job"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setIsConfirmOpen(true);
              }}
              className="rounded-full p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-300"
              aria-label="Delete job"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <Badge variant="priority" value={job.priority} />
          <span className="text-xs text-slate-400">
            {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
          </span>
        </div>
      </article>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={async () => {
          await deleteMutation.mutateAsync(job.id);
          setIsConfirmOpen(false);
        }}
        loading={deleteMutation.isPending}
        description={`This will remove ${job.position} at ${job.company} from your tracker.`}
        confirmLabel="Delete Job"
      />
    </>
  );
};

