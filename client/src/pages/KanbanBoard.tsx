import { DropResult } from '@hello-pangea/dnd';
import { LayoutGrid } from 'lucide-react';
import { KanbanBoard as KanbanBoardView } from '@/components/kanban/KanbanBoard';
import { EditJobForm } from '@/components/forms/EditJobForm';
import { JobDetailSlideOver } from '@/components/kanban/JobDetailSlideOver';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { useJobs, useUpdateJobStatus } from '@/hooks/useJobs';
import { useJobStore } from '@/store/jobStore';
import { useUiStore } from '@/store/uiStore';
import { JobStatus } from '@/types';

export const KanbanBoard = () => {
  const { search, priority } = useJobStore();
  const openAddJob = useUiStore((state) => state.openAddJob);
  const jobsQuery = useJobs({
    search,
    priority,
    sortBy: 'createdAt',
    order: 'desc',
    page: 1,
    limit: 100
  });
  const updateStatusMutation = useUpdateJobStatus();

  const handleDragEnd = (result: DropResult) => {
    const destinationStatus = result.destination?.droppableId as JobStatus | undefined;

    if (!result.destination || !destinationStatus) {
      return;
    }

    if (destinationStatus === result.source.droppableId) {
      return;
    }

    updateStatusMutation.mutate({
      id: result.draggableId,
      status: destinationStatus
    });
  };

  return (
    <PageWrapper title="Kanban Board">
      <div className="space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Track every opportunity through your pipeline
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Drag applications between stages to keep your search current.
            </p>
          </div>
          {jobsQuery.data && jobsQuery.data.total > jobsQuery.data.jobs.length && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing the latest {jobsQuery.data.jobs.length} of {jobsQuery.data.total} jobs.
            </p>
          )}
        </div>

        {jobsQuery.isLoading ? (
          <LoadingScreen compact label="Loading your board..." />
        ) : jobsQuery.isError ? (
          <ErrorState description="We couldn't load the kanban board right now." />
        ) : jobsQuery.data.jobs.length === 0 ? (
          <EmptyState
            icon={<LayoutGrid className="h-7 w-7" />}
            title="Your board is empty"
            description="Start by adding a job to your wishlist or pipeline."
            action={
              <button
                type="button"
                className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                onClick={() => openAddJob('WISHLIST')}
              >
                Add Job
              </button>
            }
          />
        ) : (
          <KanbanBoardView
            jobs={jobsQuery.data.jobs}
            onDragEnd={handleDragEnd}
            onAddJob={openAddJob}
          />
        )}
      </div>

      <EditJobForm />
      <JobDetailSlideOver />
    </PageWrapper>
  );
};

