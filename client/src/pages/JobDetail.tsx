import { useState } from 'react';
import { ArrowLeft, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EditJobForm } from '@/components/forms/EditJobForm';
import { JobDetailSections } from '@/components/kanban/JobDetailSections';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { useDeleteJob, useJob } from '@/hooks/useJobs';
import { useUiStore } from '@/store/uiStore';

export const JobDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const openEditJob = useUiStore((state) => state.openEditJob);
  const jobQuery = useJob(id);
  const deleteMutation = useDeleteJob();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <PageWrapper title={jobQuery.data ? jobQuery.data.company : 'Job Detail'}>
      {jobQuery.isLoading ? (
        <LoadingScreen compact label="Loading application..." />
      ) : jobQuery.isError || !jobQuery.data ? (
        <ErrorState description="We couldn't find that application." />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              to="/kanban"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Board
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary" onClick={() => openEditJob(jobQuery.data.id)}>
                <Pencil className="h-4 w-4" />
                Edit Job
              </Button>
              <Button variant="danger" onClick={() => setIsConfirmOpen(true)}>
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>

          <section className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
                  Application Overview
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
                  {jobQuery.data.company}
                </h1>
                <p className="mt-1 text-lg text-slate-400">
                  {jobQuery.data.position}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="status" value={jobQuery.data.status} />
                <Badge variant="priority" value={jobQuery.data.priority} />
                {jobQuery.data.jobUrl && (
                  <a
                    href={jobQuery.data.jobUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
                  >
                    Visit Listing
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="mt-8">
              <JobDetailSections job={jobQuery.data} />
            </div>
          </section>
        </div>
      )}

      <EditJobForm />

      {jobQuery.data && (
        <ConfirmDialog
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={async () => {
            await deleteMutation.mutateAsync(jobQuery.data!.id);
            navigate('/kanban');
          }}
          loading={deleteMutation.isPending}
          description={`Delete ${jobQuery.data.position} at ${jobQuery.data.company}? This cannot be undone.`}
          confirmLabel="Delete Job"
        />
      )}
    </PageWrapper>
  );
};

