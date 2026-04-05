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
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="#94A3B8" />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} stroke="#94A3B8" />
        <Tooltip
          cursor={{ fill: 'rgba(59, 130, 246, 0.08)' }}
          contentStyle={{
            borderRadius: '16px',
            border: '1px solid #334155',
            backgroundColor: '#1E293B',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            color: '#F1F5F9'
          }}
        />
        <Bar dataKey="count" fill="#3B82F6" radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

