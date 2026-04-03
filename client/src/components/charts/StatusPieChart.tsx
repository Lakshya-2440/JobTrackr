import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { AnalyticsSummary, JobStatus } from '@/types';
import { JOB_STATUSES, STATUS_CHART_COLORS, STATUS_LABELS } from '@/utils/constants';

interface StatusPieChartProps {
  byStatus: AnalyticsSummary['byStatus'];
  totalApplications: number;
}

export const StatusPieChart = ({ byStatus, totalApplications }: StatusPieChartProps) => {
  const pieData = JOB_STATUSES.map((status) => ({
    name: STATUS_LABELS[status],
    value: byStatus[status],
    status
  })).filter((item) => item.value > 0);

  return (
    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={105}
            paddingAngle={4}
          >
            {pieData.map((item) => (
              <Cell
                key={item.status}
                fill={STATUS_CHART_COLORS[item.status as JobStatus]}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) {
                return null;
              }

              const item = payload[0].payload as {
                name: string;
                value: number;
              };
              const percentage =
                totalApplications === 0
                  ? 0
                  : ((item.value / totalApplications) * 100).toFixed(1);

              return (
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-lg dark:border-slate-700 dark:bg-slate-900">
                  <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">
                    {item.value} applications
                  </p>
                  <p className="text-slate-500 dark:text-slate-400">{percentage}% of total</p>
                </div>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

