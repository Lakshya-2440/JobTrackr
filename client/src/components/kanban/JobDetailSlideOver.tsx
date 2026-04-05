import { useEffect, useState } from 'react';
import { ExternalLink, Pencil, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { JobDetailSections } from '@/components/kanban/JobDetailSections';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { useDeleteJob, useJob } from '@/hooks/useJobs';
import { useUiStore } from '@/store/uiStore';
import { Badge } from '@/components/ui/Badge';

export const JobDetailSlideOver = () => {
  const { jobDetailId, closeJobDetail, openEditJob } = useUiStore();
  const jobQuery = useJob(jobDetailId ?? undefined);
  const deleteMutation = useDeleteJob();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    if (!jobDetailId) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeJobDetail();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [closeJobDetail, jobDetailId]);

  if (!jobDetailId) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm" onClick={closeJobDetail} />
      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col border-l border-slate-800 bg-slate-950 shadow-soft transition-all">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
              Application Detail
            </p>
            <h2 className="text-xl font-semibold text-white">
              {jobQuery.data ? `${jobQuery.data.company} · ${jobQuery.data.position}` : 'Loading...'}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeJobDetail}
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-900 hover:text-slate-200"
            aria-label="Close job detail"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {jobQuery.isLoading ? (
            <LoadingScreen compact label="Loading application..." />
          ) : jobQuery.isError || !jobQuery.data ? (
            <ErrorState description="We couldn't load this application. Try reopening it." />
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="status" value={jobQuery.data.status} />
                <Badge variant="priority" value={jobQuery.data.priority} />
                <Link
                  to={`/jobs/${jobQuery.data.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
                >
                  Open Full Page
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>

              <JobDetailSections job={jobQuery.data} />
            </div>
          )}
        </div>

        {jobQuery.data && (
          <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4 dark:border-slate-800">
            <Button
              variant="secondary"
              onClick={() => openEditJob(jobQuery.data!.id)}
            >
              <Pencil className="h-4 w-4" />
              Edit Job
            </Button>
            <Button variant="danger" onClick={() => setIsConfirmOpen(true)}>
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        )}
      </aside>

      {jobQuery.data && (
        <ConfirmDialog
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={async () => {
            await deleteMutation.mutateAsync(jobQuery.data!.id);
            setIsConfirmOpen(false);
            closeJobDetail();
          }}
          loading={deleteMutation.isPending}
          description={`Delete ${jobQuery.data.position} at ${jobQuery.data.company}? This cannot be undone.`}
          confirmLabel="Delete Job"
        />
      )}
    </>
  );
};

