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
    <section className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4 md:grid-cols-2">
      {detailGrid.map((item) => (
        <div key={item.label}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            {item.label}
          </p>
          <p className="mt-2 text-sm font-medium text-white">
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
            className="mt-2 inline-flex text-sm font-medium text-blue-400 transition hover:text-blue-300"
          >
            View Listing
          </a>
        ) : (
          <p className="mt-2 text-sm font-medium text-white">--</p>
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
              className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200"
            >
              {tag}
            </span>
          ))
        ) : (
          <p className="text-sm text-slate-400">No tags added yet.</p>
        )}
      </div>
    </section>

    {job.description && (
      <section>
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
          Description
        </h3>
        <p className="mt-3 whitespace-pre-wrap rounded-2xl border border-slate-800 bg-slate-900 p-4 text-sm leading-6 text-slate-300">
          {job.description}
        </p>
      </section>
    )}

    <section>
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Notes</h3>
      <p className="mt-3 whitespace-pre-wrap rounded-2xl border border-slate-800 bg-slate-900 p-4 text-sm leading-6 text-slate-300">
        {job.notes || 'No notes added yet.'}
      </p>
    </section>

    <section>
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
        Contacts
      </h3>
      <div className="mt-3 overflow-hidden rounded-2xl border border-slate-800">
        {job.contacts.length > 0 ? (
          <table className="min-w-full divide-y divide-slate-800 text-sm">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-400">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-400">Role</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-400">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-400">Phone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-950">
              {job.contacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="px-4 py-3 font-medium text-white">
                    {contact.name}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {contact.role || '--'}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {contact.email || '--'}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {contact.phone || '--'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="bg-slate-950 px-4 py-5 text-sm text-slate-400">
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
          className="mt-3 inline-flex rounded-full bg-blue-950/40 px-4 py-2 text-sm font-medium text-blue-300 transition hover:bg-blue-950/60"
        >
          View Resume
        </a>
      ) : (
        <p className="mt-3 text-sm text-slate-400">No resume uploaded.</p>
      )}
    </section>

    <section className="flex flex-wrap items-center gap-2">
      <Badge variant="status" value={job.status} />
      <Badge variant="priority" value={job.priority} />
    </section>
  </div>
);

