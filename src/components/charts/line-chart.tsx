'use client';

import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartContainer, type ChartContainerProps } from './chart-container';

export interface LineChartSeries {
  key: string;
  name?: string;
  color?: string;
}

export interface LineChartProps extends Omit<ChartContainerProps, 'children'> {
  data: Record<string, unknown>[];
  xAxisKey: string;
  series: LineChartSeries[];
}

export function LineChart({
  data,
  xAxisKey,
  series,
  height = 300,
  isLoading,
  isEmpty,
  title,
  description,
  action,
  className,
}: LineChartProps) {
  const isDataEmpty = isEmpty || !data || data.length === 0;

  return (
    <ChartContainer
      height={height}
      isLoading={isLoading}
      isEmpty={isDataEmpty}
      title={title}
      description={description}
      action={action}
      className={className}
    >
      <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
        <XAxis
          dataKey={xAxisKey}
          stroke="var(--muted-foreground)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-elevation-2)',
            color: 'var(--foreground)',
          }}
        />
        {series.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.name ?? s.key}
            stroke={s.color ?? 'var(--accent)'}
            strokeWidth={2.5}
            dot={{ r: 3, fill: s.color ?? 'var(--accent)' }}
            activeDot={{ r: 6 }}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  );
}
