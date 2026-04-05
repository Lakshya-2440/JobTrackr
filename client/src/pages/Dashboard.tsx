import { BriefcaseBusiness, FilePlus2, HandCoins, MessagesSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { StatCard } from '@/components/ui/StatCard';
import { useAnalytics, useJobs } from '@/hooks/useJobs';
import { useJobStore } from '@/store/jobStore';
import { useUiStore } from '@/store/uiStore';
import { formatDate } from '@/utils/formatDate';
import { Badge } from '@/components/ui/Badge';

export const Dashboard = () => {
  const navigate = useNavigate();
  const openAddJob = useUiStore((state) => state.openAddJob);
  const { search, status, priority } = useJobStore();
  const analyticsQuery = useAnalytics();
  const recentJobsQuery = useJobs({
    search,
    status,
    priority,
    sortBy: 'createdAt',
    order: 'desc',
    page: 1,
    limit: 5
  });

  const analytics = analyticsQuery.data;
  const activeCount = (analytics?.byStatus.APPLIED ?? 0) + (analytics?.byStatus.INTERVIEW ?? 0);

  return (
    <PageWrapper title="Dashboard">
      <div className="space-y-6">
        {analyticsQuery.isLoading ? (
          <LoadingScreen compact label="Loading dashboard..." />
        ) : analyticsQuery.isError || !analytics ? (
          <ErrorState description="We couldn't load your dashboard summary right now." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Applications"
              value={analytics.totalApplications}
              icon={BriefcaseBusiness}
              tone="blue"
            />
            <StatCard label="Active" value={activeCount} icon={MessagesSquare} tone="amber" />
            <StatCard
              label="Interviews"
              value={analytics.byStatus.INTERVIEW}
              icon={FilePlus2}
              tone="violet"
            />
            <StatCard
              label="Offers"
              value={analytics.byStatus.OFFER}
              icon={HandCoins}
              tone="green"
            />
          </div>
        )}

        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Recent Applications
              </h2>
              <p className="text-sm text-slate-400">
                Your five most recently added opportunities.
              </p>
            </div>
            <Button variant="secondary" onClick={() => navigate('/kanban')}>
              View All
            </Button>
          </div>

          {recentJobsQuery.isLoading ? (
            <LoadingScreen compact label="Loading recent applications..." />
          ) : recentJobsQuery.isError ? (
            <ErrorState description="Recent applications are unavailable at the moment." />
          ) : recentJobsQuery.data.jobs.length === 0 ? (
            <EmptyState
              icon={<BriefcaseBusiness className="h-7 w-7" />}
              title="No applications yet"
              description="Add your first application to start building momentum."
              action={<Button onClick={() => openAddJob()}>Add your first job</Button>}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-800 text-sm">
                <thead>
                  <tr className="text-left text-slate-400">
                    <th className="pb-3 pr-4 font-semibold">Company</th>
                    <th className="pb-3 pr-4 font-semibold">Position</th>
                    <th className="pb-3 pr-4 font-semibold">Status</th>
                    <th className="pb-3 pr-4 font-semibold">Priority</th>
                    <th className="pb-3 font-semibold">Date Added</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {recentJobsQuery.data.jobs.map((job) => (
                    <tr
                      key={job.id}
                      className="cursor-pointer transition hover:bg-slate-800/50"
                      onClick={() => navigate(`/jobs/${job.id}`)}
                    >
                      <td className="py-4 pr-4 font-semibold text-white">
                        {job.company}
                      </td>
                      <td className="py-4 pr-4 text-slate-300">
                        {job.position}
                      </td>
                      <td className="py-4 pr-4">
                        <Badge variant="status" value={job.status} />
                      </td>
                      <td className="py-4 pr-4">
                        <Badge variant="priority" value={job.priority} />
                      </td>
                      <td className="py-4 text-slate-600 dark:text-slate-300">
                        {formatDate(job.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <button
        type="button"
        onClick={() => openAddJob()}
        className="fixed bottom-6 right-6 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
        aria-label="Quick add job"
      >
        <FilePlus2 className="h-6 w-6" />
      </button>
    </PageWrapper>
  );
};

