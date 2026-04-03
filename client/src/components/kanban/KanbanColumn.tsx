import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import { JobCard } from '@/components/kanban/JobCard';
import { IJob, JobStatus } from '@/types';
import { STATUS_LABELS } from '@/utils/constants';

interface KanbanColumnProps {
  status: JobStatus;
  jobs: IJob[];
  onAddJob: (status: JobStatus) => void;
}

export const KanbanColumn = ({ status, jobs, onAddJob }: KanbanColumnProps) => (
  <div className="flex min-h-[560px] w-[320px] shrink-0 flex-col rounded-3xl border border-slate-200 bg-slate-100/80 p-4 dark:border-slate-800 dark:bg-slate-900">
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
          {STATUS_LABELS[status]}
        </h2>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm dark:bg-slate-950 dark:text-slate-200">
          {jobs.length}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onAddJob(status)}
        className="rounded-full p-2 text-slate-500 transition hover:bg-white hover:text-slate-700 dark:hover:bg-slate-950 dark:hover:text-slate-200"
        aria-label={`Add job to ${STATUS_LABELS[status]}`}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>

    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`flex min-h-[320px] flex-1 flex-col gap-3 rounded-2xl p-1 transition ${
            snapshot.isDraggingOver ? 'bg-white/70 dark:bg-slate-950/40' : ''
          }`}
        >
          {jobs.map((job, index) => (
            <Draggable key={job.id} draggableId={job.id} index={index}>
              {(draggableProvided) => (
                <div
                  ref={draggableProvided.innerRef}
                  {...draggableProvided.draggableProps}
                  {...draggableProvided.dragHandleProps}
                >
                  <JobCard job={job} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          {jobs.length === 0 && (
            <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-300 px-4 text-center text-sm text-slate-400 dark:border-slate-700">
              Drag applications here or add a new one.
            </div>
          )}
        </div>
      )}
    </Droppable>
  </div>
);

