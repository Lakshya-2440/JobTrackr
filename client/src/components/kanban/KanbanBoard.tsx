import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { KanbanColumn } from '@/components/kanban/KanbanColumn';
import { IJob, JobStatus } from '@/types';
import { JOB_STATUSES } from '@/utils/constants';

interface KanbanBoardProps {
  jobs: IJob[];
  onDragEnd: (result: DropResult) => void;
  onAddJob: (status: JobStatus) => void;
}

export const KanbanBoard = ({ jobs, onDragEnd, onAddJob }: KanbanBoardProps) => {
  const groupedJobs = JOB_STATUSES.reduce<Record<JobStatus, IJob[]>>(
    (accumulator, status) => {
      accumulator[status] = jobs.filter((job) => job.status === status);
      return accumulator;
    },
    {
      WISHLIST: [],
      APPLIED: [],
      INTERVIEW: [],
      OFFER: [],
      REJECTED: []
    }
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-5 overflow-x-auto pb-4">
        {JOB_STATUSES.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            jobs={groupedJobs[status]}
            onAddJob={onAddJob}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

