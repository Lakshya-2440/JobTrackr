import { Badge } from '@/components/ui/Badge';
import { IJob } from '@/types';
import { formatCurrencyRange, formatDate } from '@/utils/formatDate';

interface JobDetailSectionsProps {
  job: IJob;
}

const detailGrid = [
  {
    label: 'Location',
    value: (job: IJob) => job.location ?? '--'
  },
  {
    label: 'Salary Range',
    value: (job: IJob) => formatCurrencyRange(job)
  },
  {
    label: 'Applied Date',
    value: (job: IJob) => formatDate(job.appliedDate)
  },
  {
    label: 'Follow Up Date',
    value: (job: IJob) => formatDate(job.followUpDate)
  }
];

export const JobDetailSections = ({ job }: JobDetailSectionsProps) => (
  <div className="space-y-6">
    <section className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2">
      {detailGrid.map((item) => (
        <div key={item.label}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            {item.label}
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
            {item.value(job)}
          </p>
        </div>
      ))}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Job URL
        </p>
        {job.jobUrl ? (
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex text-sm font-medium text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View Listing
          </a>
        ) : (
          <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">--</p>
        )}
      </div>
    </section>

    <section>
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Tags</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {job.tags.length > 0 ? (
          job.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {tag}
            </span>
          ))
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">No tags added yet.</p>
        )}
      </div>
    </section>

    {job.description && (
      <section>
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
          Description
        </h3>
        <p className="mt-3 whitespace-pre-wrap rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          {job.description}
        </p>
      </section>
    )}

    <section>
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Notes</h3>
      <p className="mt-3 whitespace-pre-wrap rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
        {job.notes || 'No notes added yet.'}
      </p>
    </section>

    <section>
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
        Contacts
      </h3>
      <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
        {job.contacts.length > 0 ? (
          <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-500">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-500">Role</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-500">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-500">Phone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
              {job.contacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                    {contact.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {contact.role || '--'}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {contact.email || '--'}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {contact.phone || '--'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="bg-white px-4 py-5 text-sm text-slate-500 dark:bg-slate-950 dark:text-slate-400">
            No contacts linked to this application yet.
          </div>
        )}
      </div>
    </section>

    <section>
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Resume</h3>
      {job.resumeUrl ? (
        <a
          href={job.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300"
        >
          View Resume
        </a>
      ) : (
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">No resume uploaded.</p>
      )}
    </section>

    <section className="flex flex-wrap items-center gap-2">
      <Badge variant="status" value={job.status} />
      <Badge variant="priority" value={job.priority} />
    </section>
  </div>
);

