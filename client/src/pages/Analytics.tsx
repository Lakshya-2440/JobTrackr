import { differenceInCalendarDays } from 'date-fns';
import { BarChart3, BriefcaseBusiness, HandCoins, MessagesSquare, Sparkles } from 'lucide-react';
import { ApplicationsOverTimeChart } from '@/components/charts/ApplicationsOverTimeChart';
import { StatusPieChart } from '@/components/charts/StatusPieChart';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { StatCard } from '@/components/ui/StatCard';
import { useAnalytics, useJobs } from '@/hooks/useJobs';
import { useUiStore } from '@/store/uiStore';

export const Analytics = () => {
  const openAddJob = useUiStore((state) => state.openAddJob);
  const analyticsQuery = useAnalytics();
  const jobsQuery = useJobs({
    sortBy: 'createdAt',
    order: 'desc',
    page: 1,
    limit: 1000
  });

  const analytics = analyticsQuery.data;
  const activeCount = (analytics?.byStatus.APPLIED ?? 0) + (analytics?.byStatus.INTERVIEW ?? 0);
  const appliedJobs = jobsQuery.data?.jobs.filter((job) => job.appliedDate) ?? [];
  const averageTime =
    appliedJobs.length > 0
      ? Math.round(
          appliedJobs.reduce((total, job) => {
            return total + differenceInCalendarDays(new Date(job.appliedDate!), new Date(job.createdAt));
          }, 0) / appliedJobs.length
        )
      : null;

  return (
    <PageWrapper title="Analytics">
      {analyticsQuery.isLoading ? (
        <LoadingScreen compact label="Crunching your job search numbers..." />
      ) : analyticsQuery.isError || !analytics ? (
        <ErrorState description="Analytics are unavailable right now. Try again soon." />
      ) : analytics.totalApplications === 0 ? (
        <EmptyState
          icon={<BarChart3 className="h-7 w-7" />}
          title="Start tracking to unlock analytics"
          description="Once you add a few applications, you’ll see response trends, status breakdowns, and pipeline momentum here."
          action={<Button onClick={() => openAddJob()}>Add your first job</Button>}
        />
      ) : (
        <div className="space-y-6">
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
              icon={Sparkles}
              tone="violet"
            />
            <StatCard
              label="Offers"
              value={analytics.byStatus.OFFER}
              icon={HandCoins}
              tone="green"
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Applications by Status
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                See how your pipeline is distributed right now.
              </p>
              <StatusPieChart
                byStatus={analytics.byStatus}
                totalApplications={analytics.totalApplications}
              />
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Applications Over Time
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Your momentum across the last six months.
              </p>
              <ApplicationsOverTimeChart data={analytics.applicationsByMonth} />
            </section>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Response Rate</p>
              <p className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                {analytics.responseRate}%
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Of applications that got a response.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Average Time</p>
              <p className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                {averageTime !== null ? `${averageTime}d` : 'N/A'}
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Days between logging the role and marking it as applied.
              </p>
            </section>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

