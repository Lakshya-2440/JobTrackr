import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { AnalyticsSummary } from '@/types';

interface ApplicationsOverTimeChartProps {
  data: AnalyticsSummary['applicationsByMonth'];
}

export const ApplicationsOverTimeChart = ({ data }: ApplicationsOverTimeChartProps) => (
  <div className="h-[320px]">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} />
        <Tooltip
          cursor={{ fill: 'rgba(37, 99, 235, 0.08)' }}
          contentStyle={{
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.12)'
          }}
        />
        <Bar dataKey="count" fill="#2563EB" radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

